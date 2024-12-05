// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "./LDRToken.sol";
import "./UserManager.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokenDistribution - Gère la distribution des tokens après les transactions
interface ITokenDistribution {
    function distributeTokens(address user, uint256 amountSpent) external;
}

contract TokenDistribution is Ownable {
    // ========================
    // CONSTANTES
    // ========================
    uint256 public constant MAX_TOKENS = 200; // Maximum de tokens distribués par transaction
    uint256 public constant DECAY_PARAMETER = 200; // Paramètre de décroissance pour le calcul des tokens

    // ========================
    // VARIABLES D'ÉTAT
    // ========================
    ILDRToken ldrToken; // Interface pour le contrat LDRToken
    IUserManager userManager; // Interface pour le contrat UserManager

    // ========================
    // ÉVÉNEMENTS
    // ========================
    /// @notice Événement émis lorsqu'une distribution de tokens est effectuée
    /// @param user Adresse de l'utilisateur
    /// @param amountSpent Montant dépensé dans la transaction
    /// @param tokensDistributed Nombre de tokens distribués
    event TokensDistributed(
        address indexed user,
        uint256 amountSpent,
        uint256 tokensDistributed
    );

    // ========================
    // CONSTRUCTEUR
    // ========================
    constructor() Ownable(msg.sender) {}

    // ========================
    // INITIALISATION
    // ========================
    /// @notice Initialise l'adresse du contrat LDRToken
    /// @param _ldrTokenAddress Adresse du contrat LDRToken
    function initializeLDRToken(address _ldrTokenAddress) external onlyOwner {
        ldrToken = ILDRToken(_ldrTokenAddress);
    }

    /// @notice Initialise l'adresse du contrat UserManager
    /// @param _userManagerAddress Adresse du contrat UserManager
    function initializeUserManager(
        address _userManagerAddress
    ) external onlyOwner {
        userManager = IUserManager(_userManagerAddress);
    }

    // ========================
    // MODIFICATEURS
    // ========================
    /// @dev Vérifie que l'appelant est le contrat NFT
    modifier onlyNFTContract() {
        require(
            msg.sender == address(0), // Remplacez par l'adresse réelle du contrat NFT
            "TokenDistribution: Caller is not the NFT contract"
        );
        _;
    }

    // ========================
    // MÉTHODES PUBLIQUES
    // ========================
    /// @notice Distribue des tokens à un utilisateur après une transaction
    /// @param user Adresse de l'utilisateur recevant les tokens
    /// @param amountSpent Montant dépensé dans la transaction
    function distributeTokens(
        address user,
        uint256 amountSpent
    ) external onlyNFTContract {
        require(user != address(0), "User address cannot be 0x0");
        require(amountSpent > 0, "Amount spent must be greater than 0");
        require(
            userManager.isUserRegistered(user),
            "User is not registered with UserManager"
        );

        uint256 tokensToDistribute = calculateTokens(amountSpent);

        // Appelle la méthode mintReward dans le contrat LDRToken
        ldrToken.mintReward(user, tokensToDistribute);

        emit TokensDistributed(user, amountSpent, tokensToDistribute);
    }

    /// @notice Calcule le nombre de tokens à distribuer en fonction du montant dépensé
    /// @param amountSpent Montant dépensé dans la transaction
    /// @return tokens Nombre de tokens à distribuer
    function calculateTokens(
        uint256 amountSpent
    ) public pure returns (uint256) {
        require(amountSpent > 0, "Amount spent must be greater than 0");

        return (MAX_TOKENS * amountSpent) / (DECAY_PARAMETER + amountSpent);
    }
}
