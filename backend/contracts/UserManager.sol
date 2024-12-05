// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LDRToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface IUserManager {
    function getLastMintTime(address user) external view returns (uint256);
    function updateLastMintTime(address user) external;
    function isUserRegistered(address user) external view returns (bool);
    function setTokenContract(address tokenContract) external;
}

contract UserManager is Ownable {
    // Structure pour stocker les informations de l'utilisateur
    struct User {
        bool isRegistered;
        uint256 lastMintTime; // Dernière fois qu'il a mint
    }

    // Mapping des utilisateurs
    mapping(address => User) private users;

    // Événements
    event UserRegistered(address indexed user);
    event MintPermissionUpdated(address indexed user, bool canMint);

    constructor() Ownable(msg.sender) {}

    // Modifier pour vérifier si l'appelant est le propriétaire ou le contrat LDRToken
    modifier onlyOwnerOrTokenContract() {
        require(
            msg.sender == owner() || msg.sender == address(ldrToken),
            "UserManager: Caller is not the owner or the token contract"
        );
        _;
    }

    // Variable
    ILDRToken public ldrToken;

    // Fonction poour définir LDRToken
    function setTokenContract(address tokenContract) external onlyOwner {
        require(tokenContract != address(0), "Invalid token contract address");
        ldrToken = ILDRToken(tokenContract);
    }

    // Fonction pour enregistrer un utilisateur
    function registerUser(address user) external onlyOwner {
        require(!users[user].isRegistered, "User already registered");
        users[user] = User(true, 0);
        emit UserRegistered(user);
    }

    // Fonction pour obtenir le dernier mint time d'un utilisateur
    function getLastMintTime(address user) external view returns (uint256) {
        require(users[user].isRegistered, "User not registered");
        return users[user].lastMintTime;
    }

    // Fonction pour reset le dernier mint time d'un utilisateur
    function resetLastMintTime(address user) external onlyOwnerOrTokenContract {
        require(users[user].isRegistered, "User not registered");
        users[user].lastMintTime = 0;
    }

    // Fonction pour mettre à jour le dernier mint time d'un utilisateur
    function updateLastMintTime(
        address user
    ) external onlyOwnerOrTokenContract {
        require(users[user].isRegistered, "User not registered");
        users[user].lastMintTime = block.timestamp;
    }

    // Fonction pour vérifier si un utilisateur est enregistré
    function isUserRegistered(address user) external view returns (bool) {
        return users[user].isRegistered;
    }
}
