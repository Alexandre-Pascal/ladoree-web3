// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LDRToken.sol";
import "./UserManager.sol";

interface ITokenDistribution {
    function distributeTokens(address user, uint256 amountSpent) external;
}

contract TokenDistribution {
    uint256 public constant MAX_TOKENS = 200; // Maximum de tokens distribuables par transaction
    uint256 public constant DECAY_PARAMETER = 200; // Paramètre de décroissance

    ILDRToken ldrToken;
    IUserManager userManager;

    // Event pour notifier la distribution de tokens
    event TokensDistributed(
        address indexed user,
        uint256 amountSpent,
        uint256 tokensDistributed
    );

    //fonction pour initialiser l'adresse du contrat LDRToken
    function initializeLDRToken(address _ldrTokenAddress) external {
        ldrToken = ILDRToken(_ldrTokenAddress);
    }

    //fonction pour initialiser l'adresse du contrat UserManager
    function initializeUserManager(address _userManagerAddress) external {
        userManager = IUserManager(_userManagerAddress);
    }

    // ========================
    // MODIFICATEURS
    // ========================
    // Modificateur pour vérifier que l'appelant est le contrat qui gère la transaction du nft
    modifier onlyNFTContract() {
        require(
            msg.sender == address(0), // Adresse du contrat NFT
            "TokenDistribution: Caller is not the NFT contract"
        );
        _;
    }

    // ========================
    // MÉTHODES PUBLIQUES
    // ========================
    /// @notice Calcule le nombre de tokens à distribuer
    function calculateTokens(
        uint256 amountSpent
    ) public pure returns (uint256) {
        require(amountSpent > 0, "Amount spent must be greater than 0");

        uint256 tokens = (MAX_TOKENS * amountSpent) /
            (DECAY_PARAMETER + amountSpent);

        return tokens;
    }

    /// @notice Distribue des tokens après une transaction
    function distributeTokens(
        address user,
        uint256 amountSpent
    ) external onlyNFTContract {
        require(user != address(0), "Invalid user address");
        require(amountSpent > 0, "Amount spent must be greater than 0");
        require(userManager.isUserRegistered(user), "User not registered");

        uint256 tokensToDistribute = calculateTokens(amountSpent);

        // Appelle la méthode mintReward dans LDRToken
        ldrToken.mintReward(user, tokensToDistribute);

        emit TokensDistributed(user, amountSpent, tokensToDistribute);
    }
}
