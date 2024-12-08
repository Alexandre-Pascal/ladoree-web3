// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importations nécessaires
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

import "./Marketplace.sol";

interface IAuthenticityNFT {
    function mintNFT(
        address recipient,
        string memory metadataURI,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external returns (uint256);

    function getTokenIdByMetadata(string memory metadataURI) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

}   

/// @title AuthenticityNFT
/// @dev Contrat ERC721 pour les certificats d'authenticité avec gestion des royalties
contract AuthenticityNFT is ERC721URIStorage, IERC2981, Ownable {
    // Structure des informations de royalties
    struct RoyaltyInfo {
        address recipient; // Adresse recevant les royalties
        uint96 fee;        // Taux de royalties en basis points (e.g., 500 = 5%)
    }

    uint256 private _tokenIdCounter = 1; // Compteur pour générer des IDs uniques
    mapping(uint256 => RoyaltyInfo) private _royalties; // Mapping des royalties par NFT

    /// @dev Constructeur pour initialiser le contrat avec un nom et un symbole
    constructor() ERC721("AuthenticityNFT", "ANFT") Ownable(msg.sender) {}

    mapping(string => uint256) private _metadataToTokenId; // Associe URI à tokenId

    // un modifier onlyOwner ou le contrat marketplace pourra mint un NFT
    modifier onlyOwnerOrMarketplace() {
        require(msg.sender == owner() || msg.sender == address(marketplaceContract), "Not owner or marketplace");
        _;
    }

    function mintNFT(
        address recipient,
        string memory metadataURI,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external onlyOwnerOrMarketplace returns (uint256) {
        require(royaltyFee <= 10000, "Royalty fee exceeds 100%");

        // Générer un nouveau token ID
        uint256 tokenId = _tokenIdCounter;

        // Mint le NFT et associe les métadonnées
        _safeMint(recipient, tokenId);

        _setTokenURI(tokenId, metadataURI);

        // Associe l’URI au token ID
        _metadataToTokenId[metadataURI] = tokenId;

        // Enregistrer les informations de royalties
        _royalties[tokenId] = RoyaltyInfo(royaltyRecipient, royaltyFee);

        // Incrémenter le compteur
        _tokenIdCounter += 1;

        return tokenId;
    }

    function getTokenIdByMetadata(string memory metadataURI) public view returns (uint256) {
        require(_metadataToTokenId[metadataURI] != 0, "Token does not exist for this URI");
        return _metadataToTokenId[metadataURI];
    }

    /// @notice Récupère les informations de royalties pour un NFT donné
    /// @param tokenId L'ID du NFT
    /// @param salePrice Prix de la vente
    /// @return recipient Adresse recevant les royalties
    /// @return royaltyAmount Montant des royalties à payer
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view override returns (address recipient, uint256 royaltyAmount) {
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

    IMarketplace public marketplaceContract; // Contrat Marketplace associé

    /// @notice Définit l'address du contrat Marketplace associé
    /// @param marketplace Adresse du contrat Marketplace
    function setMarketplaceContract(address marketplace) external onlyOwner {
        require(marketplace != address(0), "Invalid marketplace address");
        marketplaceContract = IMarketplace(marketplace);
    }
}
