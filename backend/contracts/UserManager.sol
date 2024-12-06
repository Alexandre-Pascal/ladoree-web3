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
        string email; // Adresse mail de l'utilisateur
        string firstName; // Prénom de l'utilisateur
        string lastName; // Nom de l'utilisateur
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

    /// @dev Vérifie que l'utilisateur est enregistré
    modifier onlyRegisteredUser(address user) {
        require(users[user].isRegistered, "User not registered");
        _;
    }

    /// @dev Vérifie que l'utilisateur qui appelle est bien le propriétaire de l'adresse
    modifier onlyOwnerOf(address user) {
        require(msg.sender == user, "User not the owner of the address");
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

    /// @notice Récupère la dernière fois que l'utilisateur a mint
    /// @param user Adresse de l'utilisateur
    /// @return lastMintTime Timestamp de la dernière opération de mint
    function getLastMintTime(
        address user
    ) external view onlyRegisteredUser(user) returns (uint256) {
        return users[user].lastMintTime;
    }

    /// @notice Réinitialise le dernier mint time de l'utilisateur
    /// @param user Adresse de l'utilisateur
    function resetLastMintTime(
        address user
    ) external onlyOwnerOrTokenContract onlyRegisteredUser(user) {
        users[user].lastMintTime = 0;
    }

    /// @notice Met à jour la dernière fois que l'utilisateur a mint
    /// @param user Adresse de l'utilisateur
    function updateLastMintTime(
        address user
    ) external onlyOwnerOrTokenContract onlyRegisteredUser(user) {
        users[user].lastMintTime = block.timestamp;
    }

    /// @notice Vérifie si un utilisateur est enregistré
    /// @param user Adresse de l'utilisateur
    /// @return isRegistered Booléen indiquant si l'utilisateur est enregistré
    function isUserRegistered(address user) external view returns (bool) {
        return users[user].isRegistered;
    }

    // // Définir les informations personnelles de l'utilisateur

    // /// @notice Définit l'adresse mail, le prénom et le nom de l'utilisateur
    // /// @param user Adresse de l'utilisateur
    // /// @param email Adresse mail de l'utilisateur
    // /// @param firstName Prénom de l'utilisateur
    // /// @param lastName Nom de l'utilisateur
    // function setUserInfo(
    //     address user,
    //     string memory ?email,
    //     string memory ?firstName,
    //     string memory ?lastName
    // ) external onlyOwner {
    //     users[user].email = email;
    //     users[user].firstName = firstName;
    //     users[user].lastName = lastName;
    //     users[user].isRegistered = true;
    // }

    /// notice Perfet de définir l'addresse mail de l'utilisateur
    /// @param user Adresse de l'utilisateur
    /// @param email Adresse mail de l'utilisateur
    function setUserEmail(
        address user,
        string memory email
    ) public onlyOwnerOf(user) {
        users[user].email = email;
        users[user].isRegistered = true;
    }

    /// @notice Définit le prénom de l'utilisateur
    /// @param user Adresse de l'utilisateur
    /// @param firstName Prénom de l'utilisateur
    function setUserFirstName(
        address user,
        string memory firstName
    ) public onlyOwnerOf(user) {
        users[user].firstName = firstName;
        users[user].isRegistered = true;
    }

    /// @notice Définit le nom de l'utilisateur
    /// @param user Adresse de l'utilisateur
    /// @param lastName Nom de l'utilisateur
    function setUserLastName(
        address user,
        string memory lastName
    ) public onlyOwnerOf(user) {
        users[user].lastName = lastName;
    }

    /// @notice Définit les informations de l'utilisateur, utilisée dès que le user est connecté avec son metamask pour la première fois (y a une pop up qui demande ces informations)
    /// @param user Adresse de l'utilisateur
    /// @param email Adresse mail de l'utilisateur
    /// @param firstName Prénom de l'utilisateur
    /// @param lastName Nom de l'utilisateur
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
        emit UserRegistered(user);
    }
}
