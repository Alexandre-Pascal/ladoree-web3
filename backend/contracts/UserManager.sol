// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

// ========================
// IMPORTATIONS
// ========================
import "./LDRToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// ========================
// INTERFACES
// ========================
/**
 * @title IUserManager
 * @notice Interface pour la gestion des utilisateurs.
 */
interface IUserManager {
    function getLastMintTime(address user) external view returns (uint256);
    function updateLastMintTime(address user) external;
    function isUserRegistered(address user) external view returns (bool);
    function setTokenContract(address tokenContract) external;
}

// ========================
// CONTRAT PRINCIPAL
// ========================
/**
 * @title UserManager
 * @notice Gère l'enregistrement et les informations des utilisateurs pour le projet.
 */
contract UserManager is Ownable {
    // ========================
    // STRUCTURES
    // ========================
    /**
     * @dev Structure pour stocker les informations d'un utilisateur.
     */
    struct User {
        string email; // Adresse mail de l'utilisateur
        string firstName; // Prénom de l'utilisateur
        string lastName; // Nom de l'utilisateur
        bool isRegistered; // Statut d'enregistrement de l'utilisateur
        uint256 lastMintTime; // Timestamp de la dernière opération de mint
    }

    // ========================
    // VARIABLES D'ÉTAT
    // ========================
    mapping(address => User) private users; // Mapping des utilisateurs par adresse
    ILDRToken public ldrToken; // Contrat LDRToken associé

    // ========================
    // ÉVÉNEMENTS
    // ========================
    event UserRegistered(
        address indexed user,
        string email,
        string firstName,
        string lastName
    ); // Émis lors de l'enregistrement d'un utilisateur
    event MintPermissionUpdated(address indexed user, bool canMint); // Émis lors de la mise à jour de permissions

    // ========================
    // CONSTRUCTEUR
    // ========================
    /**
     * @dev Initialise le contrat avec le propriétaire.
     */
    constructor() Ownable(msg.sender) {}

    // ========================
    // MODIFICATEURS
    // ========================
    /**
     * @dev Vérifie que l'appelant est soit le propriétaire, soit le contrat LDRToken.
     */
    modifier onlyOwnerOrTokenContract() {
        require(
            msg.sender == owner() || msg.sender == address(ldrToken),
            "UserManager: Caller is not the owner or the token contract"
        );
        _;
    }

    /**
     * @dev Vérifie que l'utilisateur est enregistré.
     */
    modifier onlyRegisteredUser(address user) {
        require(users[user].isRegistered, "User not registered");
        _;
    }

    /**
     * @dev Vérifie que l'appelant est bien l'utilisateur propriétaire de l'adresse.
     */
    modifier onlyOwnerOf(address user) {
        require(msg.sender == user, "User not the owner of the address");
        _;
    }

    // ========================
    // FONCTIONS PUBLIQUES
    // ========================

    /**
     * @notice Récupère la dernière fois que l'utilisateur a mint.
     * @param user Adresse de l'utilisateur.
     * @return lastMintTime Timestamp de la dernière opération de mint.
     */
    function getLastMintTime(
        address user
    ) external view onlyRegisteredUser(user) returns (uint256) {
        return users[user].lastMintTime;
    }

    /**
     * @notice Réinitialise le dernier mint time de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     */
    function resetLastMintTime(
        address user
    ) external onlyOwnerOrTokenContract onlyRegisteredUser(user) {
        users[user].lastMintTime = 0;
    }

    /**
     * @notice Met à jour la dernière fois que l'utilisateur a mint.
     * @param user Adresse de l'utilisateur.
     */
    function updateLastMintTime(
        address user
    ) external onlyOwnerOrTokenContract onlyRegisteredUser(user) {
        users[user].lastMintTime = block.timestamp;
    }

    /**
     * @notice Vérifie si un utilisateur est enregistré.
     * @param user Adresse de l'utilisateur.
     * @return isRegistered Booléen indiquant si l'utilisateur est enregistré.
     */
    function isUserRegistered(address user) external view returns (bool) {
        return users[user].isRegistered;
    }

    /**
     * @notice Définit l'adresse mail de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     * @param email Adresse mail de l'utilisateur.
     */
    function setUserEmail(
        address user,
        string memory email
    ) public onlyOwnerOf(user) {
        users[user].email = email;
    }

    /**
     * @notice Définit le prénom de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     * @param firstName Prénom de l'utilisateur.
     */
    function setUserFirstName(
        address user,
        string memory firstName
    ) public onlyOwnerOf(user) {
        users[user].firstName = firstName;
    }

    /**
     * @notice Définit le nom de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     * @param lastName Nom de l'utilisateur.
     */
    function setUserLastName(
        address user,
        string memory lastName
    ) public onlyOwnerOf(user) {
        users[user].lastName = lastName;
    }

    /**
     * @notice Enregistre un nouvel utilisateur avec ses informations.
     * @param user Adresse de l'utilisateur.
     * @param email Adresse mail de l'utilisateur.
     * @param firstName Prénom de l'utilisateur.
     * @param lastName Nom de l'utilisateur.
     */
    function registerUser(
        address user,
        string memory email,
        string memory firstName,
        string memory lastName
    ) external {
        require(!users[user].isRegistered, "User already registered");
        setUserLastName(user, lastName);
        setUserFirstName(user, firstName);
        setUserEmail(user, email);
        users[user].isRegistered = true;
        emit UserRegistered(user, email, firstName, lastName);
    }

    // ========================
    // FONCTIONS ADMIN
    // ========================
    /**
     * @notice Définit le contrat LDRToken.
     * @param tokenContract Adresse du contrat LDRToken.
     */
    function setTokenContract(address tokenContract) external onlyOwner {
        ldrToken = ILDRToken(tokenContract);
    }
}
