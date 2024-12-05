// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "./LDRToken.sol";
import "./UserManager.sol";

/// @title TokenDistribution - Gère la distribution des tokens après les transactions
interface ITokenDistribution {
    function distributeTokens(address user, uint256 amountSpent) external;
}

contract TokenDistribution {
    // ========================
    // CONSTANTES
    // ========================
    uint256 public constant MAX_TOKENS = 200; // Maximum de tokens distribués par transaction
    uint256 public constant DECAY_PARAMETER = 200; // Paramètre de décroissance pour le calcul des tokens

    // ========================
    // VARIABLES D'ÉTAT
    // ========================
    ILDRToken public ldrToken; // Interface pour le contrat LDRToken
    IUserManager public userManager; // Interface pour le contrat UserManager

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
    // INITIALISATION
    // ========================
    /// @notice Initialise l'adresse du contrat LDRToken
    /// @param _ldrTokenAddress Adresse du contrat LDRToken
    function initializeLDRToken(address _ldrTokenAddress) external {
        require(_ldrTokenAddress != address(0), "Adresse LDRToken invalide");
        ldrToken = ILDRToken(_ldrTokenAddress);
    }

    /// @notice Initialise l'adresse du contrat UserManager
    /// @param _userManagerAddress Adresse du contrat UserManager
    function initializeUserManager(address _userManagerAddress) external {
        require(
            _userManagerAddress != address(0),
            "Adresse UserManager invalide"
        );
        userManager = IUserManager(_userManagerAddress);
    }

    // ========================
    // MODIFICATEURS
    // ========================
    /// @dev Vérifie que l'appelant est le contrat NFT
    modifier onlyNFTContract() {
        require(
            msg.sender == address(0), // Remplacez par l'adresse réelle du contrat NFT
            "TokenDistribution: L'appelant n'est pas le contrat NFT"
        );
        _;
    }

    // ========================
    // MÉTHODES PUBLIQUES
    // ========================
    /// @notice Calcule le nombre de tokens à distribuer en fonction du montant dépensé
    /// @param amountSpent Montant dépensé dans la transaction
    /// @return tokens Nombre de tokens à distribuer
    function calculateTokens(
        uint256 amountSpent
    ) public pure returns (uint256) {
        require(amountSpent > 0, "Le montant depense doit etre superieur a 0");

        return (MAX_TOKENS * amountSpent) / (DECAY_PARAMETER + amountSpent);
    }

    /// @notice Distribue des tokens à un utilisateur après une transaction
    /// @param user Adresse de l'utilisateur recevant les tokens
    /// @param amountSpent Montant dépensé dans la transaction
    function distributeTokens(
        address user,
        uint256 amountSpent
    ) external onlyNFTContract {
        require(user != address(0), "Adresse utilisateur invalide");
        require(amountSpent > 0, "Le montant depense doit etre superieur a 0");
        require(
            userManager.isUserRegistered(user),
            "Utilisateur non enregistre"
        );

        uint256 tokensToDistribute = calculateTokens(amountSpent);

        // Appelle la méthode mintReward dans le contrat LDRToken
        ldrToken.mintReward(user, tokensToDistribute);

        emit TokensDistributed(user, amountSpent, tokensToDistribute);
    }
}
