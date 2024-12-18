// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

// ========================
// IMPORTATIONS
// ========================
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserManager.sol";
import "./TokenDistribution.sol";

// ========================
// INTERFACES
// ========================
/**
 * @title ILDRToken
 * @notice Interface pour interagir avec le contrat LDRToken.
 */
interface ILDRToken {
    /**
     * @notice Mint des récompenses pour une adresse donnée.
     * @param to Adresse du destinataire des tokens.
     * @param amountToMint Montant de tokens à mint.
     */
    function mintReward(address to, uint256 amountToMint) external;
}

struct Discount {
    uint256 id; // Identifiant de la réduction
    uint256 amount; // Montant payé pour la réduction
    bool isUsed; // Statut : utilisée ou non
}

// ========================
// CONTRAT PRINCIPAL
// ========================
/**
 * @title LDRToken
 * @notice ERC20 Token pour le projet Ladorée, avec fonctionnalités de mint mensuel et récompenses.
 */
contract LDRToken is ERC20, Ownable {
    // ========================
    // ÉVÉNEMENTS
    // ========================
    event TokensMinted(address indexed to, uint256 amount);
    event MintAdjusted(
        address indexed to,
        uint256 originalAmount,
        uint256 adjustedAmount
    );

    event TokenBurned(address indexed from, uint256 amount);
    event BuyerDiscountBought(address indexed from, uint256 id, uint256 amount);
    event SellerDiscountBought(
        address indexed from,
        uint256 id,
        uint256 amount
    );
    event DiscountUsed(address indexed user, uint256 id);

    // ========================
    // VARIABLES
    // ========================
    IUserManager public userManager;
    ITokenDistribution public tokenDistribution;
    mapping(address => Discount[]) public userDiscounts;
    uint256 public discountCounter; // Compteur global des réductions

    // ========================
    // CONSTRUCTEUR
    // ========================
    /**
     * @notice Initialise le contrat avec les adresses des dépendances.
     */
    constructor() ERC20("Ladoree Token", "LDR") Ownable(msg.sender) {}

    // ========================
    // MODIFICATEURS
    // ========================
    /**
     * @dev Restreint l'accès aux appels provenant du contrat TokenDistribution.
     */
    modifier onlyTokenDistribution() {
        require(
            msg.sender == address(tokenDistribution),
            "LDRToken: Unauthorized caller"
        );
        _;
    }

    /**
     * @dev Vérifie que l'appelant a suffisamment de tokens pour une réduction.
     */
    modifier canBuyDiscount(uint256 amountToUse) {
        require(
            balanceOf(msg.sender) >= amountToUse,
            "LDRToken: Insufficient balance"
        );
        _;
    }

    // ========================
    // FONCTIONS PUBLIQUES
    // ========================
    /**
     * @notice Mint mensuel limité à une fois par mois pour une adresse donnée.
     * @param to Adresse du destinataire des tokens.
     */
    function monthlyMint(address to) public {
        require(to != address(0), "LDRToken: Invalid address");
        require(
            block.timestamp - userManager.getLastMintTime(to) >= 30 days,
            "LDRToken: Can only mint once per month"
        );

        userManager.updateLastMintTime(to);
        _mintTokens(to, 10);
    }

    /**
     * @notice Mint des récompenses après une vente ou un achat.
     * @param to Adresse du destinataire des tokens.
     * @param amountToMint Montant de tokens à mint.
     */
    function mintReward(
        address to,
        uint256 amountToMint
    ) public onlyTokenDistribution {
        _mintTokens(to, amountToMint);
    }

    /**
     * @notice Brûle des tokens pour acheter une réduction sur les achats.
     * @param amountToUse Montant de tokens à brûler.
     */
    function buyBuyersDiscount(
        uint256 amountToUse
    ) public canBuyDiscount(amountToUse) {
        _burnTokens(amountToUse);
        userDiscounts[msg.sender].push(
            Discount(discountCounter, amountToUse, false)
        );
        emit BuyerDiscountBought(msg.sender, discountCounter, amountToUse);
        discountCounter++;
    }

    /**
     * @notice Brûle des tokens pour acheter une réduction sur les ventes.
     * @param amountToUse Montant de tokens à brûler.
     */
    function buySellersDiscount(
        uint256 amountToUse
    ) public canBuyDiscount(amountToUse) {
        _burnTokens(amountToUse);
        userDiscounts[msg.sender].push(
            Discount(discountCounter, amountToUse, false)
        );
        emit SellerDiscountBought(msg.sender, discountCounter, amountToUse);
        discountCounter++;
    }

    /**
     * @notice Utilise une réduction pour une transaction.
     * @param discountId Index de la réduction à utiliser.
     */
    function useDiscount(uint256 discountId) public {
        Discount[] storage discounts = userDiscounts[msg.sender];
        bool found = false;
        for (uint i = 0; i < discounts.length; i++) {
            if (discounts[i].id == discountId && !discounts[i].isUsed) {
                discounts[i].isUsed = true;
                emit DiscountUsed(msg.sender, discountId);
                found = true;
                break;
            }
        }

        require(found, "Invalid or already used discount");
    }

    /**
     * @notice Récupère toutes les réductions d'un utilisateur.
     * @param user Adresse de l'utilisateur.
     */
    function getUserDiscounts(
        address user
    ) public view returns (Discount[] memory) {
        return userDiscounts[user];
    }

    /**
     * @notice Fonction qui détermine le nombre de décimales utilisées pour le token.
     */
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    // ========================
    // FONCTIONS INTERNES
    // ========================
    /**
     * @dev Ajuste le montant à mint pour respecter un plafond de 200 tokens.
     * @param to Adresse du destinataire.
     * @param amountToMint Montant initial à mint.
     * @return uint256 Montant ajusté à mint.
     */
    function _adjustMintAmount(
        address to,
        uint256 amountToMint
    ) internal returns (uint256) {
        uint256 currentBalance = balanceOf(to);
        uint256 adjustedAmount = amountToMint;

        if (currentBalance + amountToMint > 200) {
            adjustedAmount = 200 - currentBalance;
            emit MintAdjusted(to, amountToMint, adjustedAmount);
        }

        return adjustedAmount;
    }

    /**
     * @dev Mint des tokens tout en respectant les règles de vérification.
     * @param to Adresse du destinataire.
     * @param amountToMint Montant à mint.
     */
    function _mintTokens(address to, uint256 amountToMint) private {
        require(
            userManager.isUserRegistered(to),
            "User is not registered with UserManager"
        );
        uint256 finalAmount = _adjustMintAmount(to, amountToMint);
        _mint(to, finalAmount);
        emit TokensMinted(to, finalAmount);
    }

    /**
     * @dev Brûle des tokens pour une adresse donnée.
     * @param amount Montant à brûler.
     */
    function _burnTokens(uint256 amount) internal {
        require(amount > 0, "LDRToken: Amount to burn must be greater than 0");
        _burn(msg.sender, amount);
        emit TokenBurned(msg.sender, amount);
    }

    // ========================
    // FONCTIONS ADMIN
    // ========================
    /**
     * @notice Définit l'adresse du contrat UserManager.
     * @param _userManagerAddress Adresse du contrat UserManager.
     */
    function setUserManagerContract(
        address _userManagerAddress
    ) external onlyOwner {
        userManager = IUserManager(_userManagerAddress);
    }

    /**
     * @notice Définit l'adresse du contrat TokenDistribution.
     * @param _tokenDistributionAddress Adresse du contrat TokenDistribution.
     */
    function setTokenDistributionContract(
        address _tokenDistributionAddress
    ) external onlyOwner {
        tokenDistribution = ITokenDistribution(_tokenDistributionAddress);
    }

    // ===============================================================
    // FONCTIONS DE RÉCUPÉRATION DES ADDRESSES DES CONTRATS DÉPENDANTS
    // ===============================================================
    /**
     * @notice Récupère l'adresse du contrat UserManager.
     * @return Adresse du contrat UserManager.
     */
    function getUserManagerContractAddress() external view returns (address) {
        return address(userManager);
    }

    /**
     * @notice Récupère l'adresse du contrat TokenDistribution.
     * @return Adresse du contrat TokenDistribution.
     */
    function getTokenDistributionContractAddress()
        external
        view
        returns (address)
    {
        return address(tokenDistribution);
    }
}
