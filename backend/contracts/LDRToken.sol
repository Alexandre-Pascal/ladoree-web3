// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LDRToken is ERC20, Ownable {
    using Strings for address; // Permet d'utiliser `.toHexString()` directement sur les adresses

    constructor() ERC20("Ladoree Token", "LDR") Ownable(msg.sender) {}

    // Modifier pour vérifier que le solde est inférieur à 200 tokens
    modifier checkminAndMax200Tokens(address _to, uint256 amountToMint) {
        // Vérifie que le montant à mint est supérieur à 0
        require(
            amountToMint > 0,
            "LDRToken: Le montant a mint doit etre superieur a 0"
        );

        // Vérifie que le solde de l'utilisateur est inférieur à 200 tokens
        require(
            balanceOf(_to) < 200,
            string(
                abi.encodePacked(
                    "LDRToken: ",
                    _to.toHexString(),
                    " possede deja 200 tokens"
                )
            )
        );
        _; // Continue l'exécution de la fonction
    }

    // Fonction auxiliaire pour ajuster le montant à mint
    function _adjustMintAmount(
        address to,
        uint256 amountToMint
    ) internal view returns (uint256) {
        uint256 currentBalance = balanceOf(to);

        // Ajuste le montant si nécessaire pour ne pas dépasser 200 tokens
        if (currentBalance + amountToMint > 200) {
            amountToMint = 200 - currentBalance;
        }

        return amountToMint;
    }

    // Fonction pour mint des tokens pour un utilisateur spécifique
    function mint(
        address to,
        uint256 amountToMint
    ) external onlyOwner checkminAndMax200Tokens(to, amountToMint) {
        amountToMint = _adjustMintAmount(to, amountToMint);
        _mint(to, amountToMint);
    }

    // Fonction pour mint 10 tokens
    function mintTokens(
        uint256 amountToMint
    ) external checkminAndMax200Tokens(msg.sender, amountToMint) {
        amountToMint = _adjustMintAmount(msg.sender, amountToMint);
        _mint(msg.sender, amountToMint);
    }
}
