// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

// ========================
// IMPORTATIONS
// ========================
import "./LDRToken.sol";
import "./UserManager.sol";
import "./Marketplace.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// ========================
// INTERFACES
// ========================
/**
 * @title ITokenDistribution
 * @notice Interface pour le contrat de distribution des tokens après les transactions.
 */
interface ITokenDistribution {
    function distributeTokens(address user, uint256 amountSpent) external;
    function setMarketplaceContract(address _ldrTokenAddress) external;
}

// ========================
// CONTRAT PRINCIPAL
// ========================
/**
 * @title TokenDistribution
 * @notice Gère la distribution des tokens LDR après les transactions sur la Marketplace.
 */
contract TokenDistribution is Ownable {
    // ========================
    // CONSTANTES
    // ========================
    uint256 public constant MAX_TOKENS = 200; // Maximum de tokens distribués par transaction
    uint256 public constant DECAY_PARAMETER = 200; // Paramètre de décroissance pour le calcul des tokens

    // ========================
    // VARIABLES D'ÉTAT
    // ========================
    ILDRToken private ldrToken; // Interface pour le contrat LDRToken
    IUserManager private userManager; // Interface pour le contrat UserManager
    IMarketplace private marketplace; // Interface pour le contrat Marketplace

    // ========================
    // ÉVÉNEMENTS
    // ========================
    /**
     * @notice Événement émis lorsqu'une distribution de tokens est effectuée.
     * @param user Adresse de l'utilisateur.
     * @param amountSpent Montant dépensé dans la transaction.
     * @param tokensDistributed Nombre de tokens distribués.
     */
    event TokensDistributed(
        address indexed user,
        uint256 amountSpent,
        uint256 tokensDistributed
    );

    // ========================
    // CONSTRUCTEUR
    // ========================
    /**
     * @notice Initialise le contrat TokenDistribution.
     */
    constructor() Ownable(msg.sender) {}

    // ========================
    // MODIFICATEURS
    // ========================
    /**
     * @dev Vérifie que l'appelant est le contrat Marketplace.
     */
    modifier onlyMarketplaceContract() {
        require(
            msg.sender == address(marketplace),
            "TokenDistribution: Caller is not the Marketplace contract"
        );
        _;
    }

    // ========================
    // MÉTHODES PUBLIQUES
    // ========================
    /**
     * @notice Distribue des tokens à un utilisateur après une transaction.
     * @param user Adresse de l'utilisateur recevant les tokens.
     * @param amountSpent Montant dépensé dans la transaction.
     */
    function distributeTokens(
        address user,
        uint256 amountSpent
    ) external onlyMarketplaceContract {
        uint256 tokensToDistribute = calculateTokens(amountSpent);

        // Appelle la méthode mintReward dans le contrat LDRToken
        ldrToken.mintReward(user, tokensToDistribute);

        emit TokensDistributed(user, amountSpent, tokensToDistribute);
    }

    /**
     * @notice Calcule le nombre de tokens à distribuer en fonction du montant dépensé.
     * @param amountSpent Montant dépensé dans la transaction.
     * @return tokens Nombre de tokens à distribuer.
     */
    function calculateTokens(
        uint256 amountSpent
    ) public pure returns (uint256) {
        require(amountSpent > 0, "Amount spent must be greater than 0");

        return (MAX_TOKENS * amountSpent) / (DECAY_PARAMETER + amountSpent);
    }

    // ========================
    // FONCTIONS ADMIN
    // ========================
    /**
     * @notice Définit l'adresse du contrat LDRToken.
     * @param _ldrTokenAddress Adresse du contrat LDRToken.
     */
    function setLDRTokenContract(address _ldrTokenAddress) external onlyOwner {
        ldrToken = ILDRToken(_ldrTokenAddress);
    }

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
     * @notice Définit l'adresse du contrat Marketplace.
     * @param _marketplaceAddress Adresse du contrat Marketplace.
     */
    function setMarketplaceContract(
        address _marketplaceAddress
    ) external onlyOwner {
        marketplace = IMarketplace(_marketplaceAddress);
    }

    // ===============================================================
    // FONCTIONS DE RÉCUPÉRATION DES ADDRESSES DES CONTRATS DÉPENDANTS
    // ===============================================================
    /**
     * @notice Récupère l'adresse du contrat LDRToken.
     * @return Adresse du contrat LDRToken.
     */
    function getLDRTokenContractAddress() external view returns (address) {
        return address(ldrToken);
    }

    /**
     * @notice Récupère l'adresse du contrat UserManager.
     * @return Adresse du contrat UserManager.
     */
    function getUserManagerContractAddress() external view returns (address) {
        return address(userManager);
    }

    /**
     * @notice Récupère l'adresse du contrat Marketplace.
     * @return Adresse du contrat Marketplace.
     */
    function getMarketplaceContractAddress() external view returns (address) {
        return address(marketplace);
    }
}
