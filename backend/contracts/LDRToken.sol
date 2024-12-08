// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserManager.sol";
import "./TokenDistribution.sol";
import "hardhat/console.sol";

/// @title ILDRToken - Interface pour interagir avec le contrat LDRToken
interface ILDRToken {
    function mintReward(address to, uint256 amountToMint) external;
}

/// @title LDRToken - ERC20 Token pour le projet Ladorée
/// @notice Ce contrat gère les fonctionnalités du token LDR, incluant le mint mensuel et les récompenses
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
    event MintAttemptedWithMaxBalance(
        address indexed to,
        uint256 currentBalance
    );
    event TokenBurned(address indexed from, uint256 amount);

    event BuyerDiscountBought(address indexed from, uint256 amount);
    event SellerDiscountBought(address indexed from, uint256 amount);

    // ========================
    // VARIABLES
    // ========================
    IUserManager public userManager;
    ITokenDistribution public tokenDistribution;

    // ========================
    // CONSTRUCTEUR
    // ========================
    /// @param _userManagerAddress Adresse du contrat UserManager
    /// @param _tokenDistribution Adresse du contrat TokenDistribution
    constructor(
        address _userManagerAddress,
        address _tokenDistribution
    ) ERC20("Ladoree Token", "LDR") Ownable(msg.sender) {
        userManager = IUserManager(_userManagerAddress);
        tokenDistribution = ITokenDistribution(_tokenDistribution);
    }

    // ========================
    // MODIFICATEURS
    // ========================
    /// @dev Vérifie que le solde max de 200 tokens n'est pas dépassé
    modifier checkMinAndMax200Tokens(address _to, uint256 amountToMint) {
        require(
            amountToMint > 0,
            "LDRToken: Amount to mint must be greater than 0"
        );
        if (balanceOf(_to) >= 200) {
            emit MintAttemptedWithMaxBalance(_to, balanceOf(_to));
        }
        _;
    }

    /// @dev Restreint l'accès à TokenDistribution
    modifier onlyTokenDistribution() {
        require(
            msg.sender == address(tokenDistribution),
            "LDRToken: Unauthorized caller"
        );
        _;
    }

    /// @dev Restreint l'accès à l'achat de réductions
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
    /// @notice Mint mensuel limité à une fois par mois
    /// @param to Adresse du destinataire des tokens
    /// @param amountToMint Montant à mint
    function mint(address to, uint256 amountToMint) public {
        require(to != address(0), "LDRToken: Invalid address");
        require(
            block.timestamp - userManager.getLastMintTime(to) >= 30 days,
            "LDRToken: Can only mint once per month"
        );

        userManager.updateLastMintTime(to);

        _mintTokens(to, amountToMint);
    }

    /// @notice Mint des récompenses après une vente ou un achat
    /// @param to Adresse du destinataire des tokens
    /// @param amountToMint Montant à mint
    function mintReward(
        address to,
        uint256 amountToMint
    ) public onlyTokenDistribution {
        _mintTokens(to, amountToMint);
    }

    /// @notice Brûle des tokens pour acheter des réductions d'achat
    /// @param amountToUse Montant à brûler
    function buyBuyersDiscount(
        uint256 amountToUse
    ) public canBuyDiscount(amountToUse) {
        _burnTokens(amountToUse);
        emit BuyerDiscountBought(msg.sender, amountToUse);
    }

    /// @notice Brûle des tokens pour acheter des réductions de vente

    function buySellersDiscount(
        uint256 amountToUse
    ) public canBuyDiscount(amountToUse) {
        _burnTokens(amountToUse);
        emit SellerDiscountBought(msg.sender, amountToUse);
    }

    // ========================
    // FONCTIONS INTERNES
    // ========================
    /// @dev Ajuste le montant à mint pour respecter le plafond de 200 tokens
    /// @param to Adresse du destinataire
    /// @param amountToMint Montant initial à mint
    /// @return uint256 Montant ajusté à mint
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

    /// @dev Mint des tokens tout en respectant les règles de vérification
    /// @param to Adresse du destinataire
    /// @param amountToMint Montant à mint
    function _mintTokens(
        address to,
        uint256 amountToMint
    ) private checkMinAndMax200Tokens(to, amountToMint) {
        require(
            userManager.isUserRegistered(to),
            "User is not registered with UserManager"
        );
        uint256 finalAmount = _adjustMintAmount(to, amountToMint);
        _mint(to, finalAmount);
        emit TokensMinted(to, finalAmount);
    }

    // Fonction pour dépenser des tokens (burn)
    /// @notice Brûle des tokens
    /// @param amount Montant à brûler
    function _burnTokens(uint256 amount) internal {
        require(amount > 0, "LDRToken: Amount to burn must be greater than 0");
        _burn(msg.sender, amount);
        emit TokenBurned(msg.sender, amount);
    }
}
