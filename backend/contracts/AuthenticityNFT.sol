// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importations nécessaires
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

/// @title AuthenticityNFT
/// @dev Contrat ERC721 pour les certificats d'authenticité avec gestion des royalties
contract AuthenticityNFT is ERC721URIStorage, IERC2981, Ownable {
    // Structure des informations de royalties
    struct RoyaltyInfo {
        address recipient; // Adresse recevant les royalties
        uint96 fee; // Taux de royalties en basis points (e.g., 500 = 5%)
    }

    uint256 private _tokenIdCounter; // Compteur pour générer des IDs uniques
    mapping(uint256 => RoyaltyInfo) private _royalties; // Mapping des royalties par NFT

    /// @dev Constructeur pour initialiser le contrat avec un nom et un symbole
    constructor() ERC721("AuthenticityNFT", "ANFT") Ownable(msg.sender) {}

    /// @notice Mint un nouveau NFT avec des informations de royalties
    /// @param buyer L'adresse recevant le NFT
    /// @param metadataURI URI des métadonnées du NFT
    /// @param royaltyRecipient Adresse recevant les royalties
    /// @param royaltyFee Pourcentage des royalties en basis points
    function mintNFT(
        address buyer,
        string memory metadataURI,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external onlyOwner {
        require(royaltyFee <= 10000, "Royalty fee exceeds 100%");

        // Générer un nouveau token ID
        uint256 tokenId = _tokenIdCounter;

        // Mint le NFT et associe les métadonnées
        _safeMint(buyer, tokenId);
        _setTokenURI(tokenId, metadataURI);

        // Enregistrer les informations de royalties
        _royalties[tokenId] = RoyaltyInfo(royaltyRecipient, royaltyFee);

        // Incrémenter le compteur
        _tokenIdCounter += 1;
    }

    /// @notice Récupère les informations de royalties pour un NFT donné
    /// @param tokenId L'ID du NFT
    /// @param salePrice Prix de la vente
    /// @return recipient Adresse recevant les royalties
    /// @return royaltyAmount Montant des royalties à payer
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    )
        external
        view
        override
        returns (address recipient, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalty = _royalties[tokenId];
        royaltyAmount = (salePrice * royalty.fee) / 10000;
        return (royalty.recipient, royaltyAmount);
    }

    /// @notice Déclare les interfaces supportées (ERC721, EIP-2981)
    /// @param interfaceId L'identifiant de l'interface
    /// @return bool Vrai si l'interface est supportée
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721URIStorage, IERC165) returns (bool) {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
