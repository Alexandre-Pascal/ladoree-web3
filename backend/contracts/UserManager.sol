// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "./LDRToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title UserManager - Gère l'enregistrement et les informations des utilisateurs pour le projet
/// @notice Fournit des fonctionnalités de gestion pour enregistrer, mettre à jour et vérifier les utilisateurs
interface IUserManager {
    function getLastMintTime(address user) external view returns (uint256);
    function updateLastMintTime(address user) external;
    function isUserRegistered(address user) external view returns (bool);
    function setTokenContract(address tokenContract) external;
}

contract UserManager is Ownable {
    // ========================
    // STRUCTURES
    // ========================
    /// @dev Structure pour stocker les informations de l'utilisateur
    struct User {
        bool isRegistered; // Indique si l'utilisateur est enregistré
        uint256 lastMintTime; // Dernière fois où l'utilisateur a mint
    }

    // ========================
    // VARIABLES D'ÉTAT
    // ========================
    mapping(address => User) private users; // Mapping des adresses utilisateurs vers leurs données
    ILDRToken public ldrToken; // Contrat LDRToken associé

    // ========================
    // ÉVÉNEMENTS
    // ========================
    /// @notice Émis lorsqu'un utilisateur est enregistré
    /// @param user Adresse de l'utilisateur enregistré
    event UserRegistered(address indexed user);

    /// @notice Émis lorsqu'une permission de mint est mise à jour
    /// @param user Adresse de l'utilisateur
    /// @param canMint Indique si l'utilisateur peut mint
    event MintPermissionUpdated(address indexed user, bool canMint);

    // ========================
    // CONSTRUCTEUR
    // ========================
    /// @dev Initialise le contrat avec le propriétaire
    constructor() Ownable(msg.sender) {}

    // ========================
    // MODIFICATEURS
    // ========================
    /// @dev Vérifie que l'appelant est soit le propriétaire soit le contrat LDRToken
    modifier onlyOwnerOrTokenContract() {
        require(
            msg.sender == owner() || msg.sender == address(ldrToken),
            "UserManager: Caller is not the owner or the token contract"
        );
        _;
    }

    // ========================
    // FONCTIONS PUBLIQUES
    // ========================
    /// @notice Définit le contrat LDRToken associé
    /// @param tokenContract Adresse du contrat LDRToken
    function setTokenContract(address tokenContract) external onlyOwner {
        require(tokenContract != address(0), "Invalid token contract address");
        ldrToken = ILDRToken(tokenContract);
    }

    /// @notice Enregistre un nouvel utilisateur
    /// @param user Adresse de l'utilisateur à enregistrer
    function registerUser(address user) external onlyOwner {
        require(!users[user].isRegistered, "User already registered");
        users[user] = User(true, 0);
        emit UserRegistered(user);
    }

    /// @notice Récupère la dernière fois que l'utilisateur a mint
    /// @param user Adresse de l'utilisateur
    /// @return lastMintTime Timestamp de la dernière opération de mint
    function getLastMintTime(address user) external view returns (uint256) {
        require(users[user].isRegistered, "User not registered");
        return users[user].lastMintTime;
    }

    /// @notice Réinitialise le dernier mint time de l'utilisateur
    /// @param user Adresse de l'utilisateur
    function resetLastMintTime(address user) external onlyOwnerOrTokenContract {
        require(users[user].isRegistered, "User not registered");
        users[user].lastMintTime = 0;
    }

    /// @notice Met à jour la dernière fois que l'utilisateur a mint
    /// @param user Adresse de l'utilisateur
    function updateLastMintTime(
        address user
    ) external onlyOwnerOrTokenContract {
        require(users[user].isRegistered, "User not registered");
        users[user].lastMintTime = block.timestamp;
    }

    /// @notice Vérifie si un utilisateur est enregistré
    /// @param user Adresse de l'utilisateur
    /// @return isRegistered Booléen indiquant si l'utilisateur est enregistré
    function isUserRegistered(address user) external view returns (bool) {
        return users[user].isRegistered;
    }
}
