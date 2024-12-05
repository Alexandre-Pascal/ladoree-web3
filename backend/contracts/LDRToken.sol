// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

        // console.log("Last mint time: %s", userManager.getLastMintTime(to));
        userManager.updateLastMintTime(to);
        // console.log(
        //     "Last mint time updated: %s",
        //     userManager.getLastMintTime(to)
        // );

        _mintTokens(to, amountToMint);
    }

    /// @notice Mint des récompenses après une vente ou un achat
    /// @param to Adresse du destinataire des tokens
    /// @param amountToMint Montant à mint
    function mintReward(
        address to,
        uint256 amountToMint
    ) public onlyTokenDistribution {
        require(to != address(0), "LDRToken: Invalid address");
        _mintTokens(to, amountToMint);
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
        uint256 finalAmount = _adjustMintAmount(to, amountToMint);
        _mint(to, finalAmount);
        emit TokensMinted(to, finalAmount);
    }
}
