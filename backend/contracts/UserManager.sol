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
    function isCreator(address user) external view returns (bool);
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
        string userName; // Prénom de l'utilisateur
        string email; // Adresse mail de l'utilisateur
        string bio; // Nom de l'utilisateur
        bool isRegistered; // Statut d'enregistrement de l'utilisateur
        bool isCreator; // Statut de créateur de contenu
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
        string userName,
        string email,
        string bio,
        bool isCreator
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
     * @notice Vérifie si un utilisateur est un créateur.
     * @param user Adresse de l'utilisateur.
     * @return isCreator Booléen indiquant si l'utilisateur est un créateur.
     */
    function isCreator(address user) external view returns (bool) {
        return users[user].isCreator;
    }

    /**
     * @notice Définit le prénom de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     * @param userName Prénom de l'utilisateur.
     */
    function setUserName(
        address user,
        string memory userName
    ) public onlyOwnerOf(user) onlyRegisteredUser(user) {
        users[user].userName = userName;
        //Si cette fonction est appelée après l'enregistrement de l'utilisateur, on émet un événement
        emit UserRegistered(
            user,
            userName,
            users[user].email,
            users[user].bio,
            users[user].isCreator
        );
    }

    /**
     * @notice Définit l'adresse mail de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     * @param email Adresse mail de l'utilisateur.
     */
    function setUserEmail(
        address user,
        string memory email
    ) public onlyOwnerOf(user) onlyRegisteredUser(user) {
        users[user].email = email;
        emit UserRegistered(
            user,
            users[user].userName,
            email,
            users[user].bio,
            users[user].isCreator
        );
    }

    /**
     * @notice Définit le nom de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     * @param bio Nom de l'utilisateur.
     */
    function setUserBio(
        address user,
        string memory bio
    ) public onlyOwnerOf(user) onlyRegisteredUser(user) {
        users[user].bio = bio;
        emit UserRegistered(
            user,
            users[user].userName,
            users[user].email,
            bio,
            users[user].isCreator
        );
    }
    /**
     * @notice Définit le statut de créateur de contenu de l'utilisateur.
     * @param user Adresse de l'utilisateur.
     * @param isACreator Booléen indiquant si l'utilisateur est un créateur de contenu.
     */
    function setUserIsCreator(
        address user,
        bool isACreator
    ) public onlyOwnerOf(user) onlyRegisteredUser(user) {
        users[user].isCreator = isACreator;
        emit UserRegistered(
            user,
            users[user].userName,
            users[user].email,
            users[user].bio,
            isACreator
        );
    }

    /**
     * @notice Enregistre un nouvel utilisateur avec ses informations.
     * @param user Adresse de l'utilisateur.
     * @param email Adresse mail de l'utilisateur.
     * @param userName Prénom de l'utilisateur.
     * @param bio Nom de l'utilisateur.
     */
    function registerUser(
        address user,
        string memory userName,
        string memory email,
        string memory bio,
        bool isACreator
    ) external {
        require(!users[user].isRegistered, "User already registered");

        users[user].isRegistered = true; // Enregistre l'utilisateur directement pour pouvoir appeler les fonctions de modification (Pour pouvoir bloquet les fonctions de modification si l'utilisateur n'est pas enregistré)

        setUserName(user, userName);
        if (bytes(email).length > 0) {
            setUserEmail(user, email);
        }
        if (bytes(bio).length > 0) {
            setUserBio(user, bio);
        }
        if (isACreator) {
            setUserIsCreator(user, isACreator);
        }

        // emit UserRegistered(user, userName, email, bio, isACreator); Pas besoin d'émettre l'événement ici car il est déjà émis dans les fonctions de modification (peut etre pas le plus opti mais j'ai pas trouvé de solution)
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

    // ===============================================================
    // FONCTIONS DE RÉCUPÉRATION DES ADDRESSES DES CONTRATS DÉPENDANTS
    // ===============================================================
    /**
     * @notice Récupère l'adresse du contrat LDRToken.
     * @return Adresse du contrat LDRToken.
     */
    function getTokenContract() external view returns (address) {
        return address(ldrToken);
    }
}
