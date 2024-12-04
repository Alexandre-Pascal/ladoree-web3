// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LDRToken is ERC20, Ownable {
    using Strings for address; // Permet d'utiliser `.toHexString()` directement sur les adresses

    // Événements
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

    constructor() ERC20("Ladoree Token", "LDR") Ownable(msg.sender) {}

    // Modifier pour vérifier que le solde est inférieur à 200 tokens
    modifier checkMinAndMax200Tokens(address _to, uint256 amountToMint) {
        // Vérifie que le montant à mint est supérieur à 0
        require(
            amountToMint > 0,
            "LDRToken: Le montant a mint doit etre superieur a 0"
        );

        // Vérifie que le solde de l'utilisateur est inférieur à 200 tokens
        if (balanceOf(_to) == 200) {
            emit MintAttemptedWithMaxBalance(_to, balanceOf(_to));
        }
        _; // Continue l'exécution de la fonction
    }

    // Fonction auxiliaire pour ajuster le montant à mint
    function _adjustMintAmount(
        address to,
        uint256 amountToMint
    ) internal returns (uint256) {
        uint256 currentBalance = balanceOf(to);

        // Ajuste le montant si nécessaire pour ne pas dépasser 200 tokens
        uint256 adjustedAmount = amountToMint;
        if (currentBalance + amountToMint > 200) {
            adjustedAmount = 200 - currentBalance;
            emit MintAdjusted(to, amountToMint, adjustedAmount);
        }

        return adjustedAmount;
    }

    // Fonction pour mint des tokens pour un utilisateur spécifique
    function mint(
        address to,
        uint256 amountToMint
    ) external onlyOwner checkMinAndMax200Tokens(to, amountToMint) {
        uint256 finalAmount = _adjustMintAmount(to, amountToMint);
        _mint(to, finalAmount);

        emit TokensMinted(to, finalAmount);
    }

    // Fonction pour mint 10 tokens
    function mintTokens(
        uint256 amountToMint
    ) external checkMinAndMax200Tokens(msg.sender, amountToMint) {
        uint256 finalAmount = _adjustMintAmount(msg.sender, amountToMint);
        _mint(msg.sender, finalAmount);

        emit TokensMinted(msg.sender, finalAmount);
    }
}
