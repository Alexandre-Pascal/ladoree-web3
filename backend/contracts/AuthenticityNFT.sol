// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ========================
// IMPORTATIONS
// ========================
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

import "./Marketplace.sol";

// ========================
// INTERFACES
// ========================
interface IAuthenticityNFT {
    function mintNFT(
        address recipient,
        string memory metadataURI,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external returns (uint256);

    function getTokenIdByMetadata(
        string memory metadataURI
    ) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

// ========================
// CONTRAT PRINCIPAL
// ========================
/**
 * @title AuthenticityNFT
 * @notice Contrat ERC721 pour les certificats d'authenticité avec gestion des royalties.
 */
contract AuthenticityNFT is ERC721URIStorage, IERC2981, Ownable {
    // ========================
    // STRUCTURES ET VARIABLES
    // ========================
    struct RoyaltyInfo {
        address recipient; // Adresse recevant les royalties
        uint96 fee; // Taux de royalties en basis points (e.g., 500 = 5%)
    }

    uint256 private _tokenIdCounter; // Compteur pour générer des IDs uniques
    mapping(uint256 => RoyaltyInfo) private _royalties; // Mapping des royalties par NFT
    mapping(string => uint256) private _metadataToTokenId; // Mapping des URI vers token IDs

    IMarketplace public marketplaceContract; // Contrat Marketplace associé

    // Event emitted when a new NFT is minted
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenURI
    );

    // ========================
    // CONSTRUCTEUR
    // ========================
    /**
     * @notice Initialise le contrat avec un nom et un symbole.
     */
    constructor() ERC721("AuthenticityNFT", "AUTH") Ownable(msg.sender) {
        _tokenIdCounter = 1; // Start IDs at 1
    }

    // ========================
    // MODIFICATEURS
    // ========================
    /**
     * @dev Vérifie que l'appelant est soit le propriétaire, soit le contrat Marketplace associé.
     */
    modifier onlyOwnerOrMarketplace() {
        require(
            msg.sender == owner() || msg.sender == address(marketplaceContract),
            "Not owner or marketplace"
        );
        _;
    }

    // ========================
    // FONCTIONS PUBLIQUES
    // ========================
    /**
     * @notice Mint un nouveau NFT avec des métadonnées et des royalties.
     * @param recipient Adresse du destinataire du NFT.
     * @param tokenURI URI des métadonnées du NFT.
     * @param royaltyRecipient Adresse recevant les royalties.
     * @param royaltyFee Taux de royalties (en basis points, max 10000).
     * @return tokenId L'identifiant du NFT minté.
     */
    function mintNFT(
        address recipient,
        string memory tokenURI,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external onlyOwnerOrMarketplace returns (uint256) {
        require(royaltyFee <= 10000, "Royalty fee exceeds 100%");

        uint256 tokenId = _tokenIdCounter;

        // Mint le NFT
        _safeMint(address(marketplaceContract), tokenId); // Mint to Marketplace contract
        _setTokenURI(tokenId, tokenURI);

        // Associe l'URI au token ID
        _metadataToTokenId[tokenURI] = tokenId;

        // Enregistre les royalties
        _royalties[tokenId] = RoyaltyInfo(royaltyRecipient, royaltyFee);

        _tokenIdCounter += 1;
        emit NFTMinted(tokenId, recipient, tokenURI); // Emit event

        return tokenId;
    }

    /**
     * @notice Récupère le token ID associé à une URI.
     * @param metadataURI URI des métadonnées.
     * @return uint256 Token ID correspondant.
     */
    function getTokenIdByMetadata(
        string memory metadataURI
    ) public view returns (uint256) {
        uint256 tokenId = _metadataToTokenId[metadataURI];
        // Retourne 0 si le token n'existe pas
        return tokenId;
    }

    /**
     * @notice Récupère les informations de royalties pour un NFT donné.
     * @param tokenId L'identifiant du NFT.
     * @param salePrice Prix de vente.
     * @return recipient Adresse recevant les royalties.
     * @return royaltyAmount Montant des royalties.
     */
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

    /**
     * @notice Vérifie si une interface est supportée (ERC721, EIP-2981).
     * @param interfaceId Identifiant de l'interface.
     * @return bool Vrai si l'interface est supportée.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721URIStorage, IERC165) returns (bool) {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    // ========================
    // FONCTIONS ADMIN
    // ========================
    /**
     * @notice Définit l'adresse du contrat Marketplace associé.
     * @param marketplace Adresse du contrat Marketplace.
     */
    function setMarketplaceContract(address marketplace) external onlyOwner {
        require(marketplace != address(0), "Invalid marketplace address");
        marketplaceContract = IMarketplace(marketplace);
    }

    // ===============================================================
    // FONCTIONS DE RÉCUPÉRATION DES ADDRESSES DES CONTRATS DÉPENDANTS
    // ===============================================================
    /**
     * @notice Récupère l'adresse du contrat Marketplace.
     * @return Adresse du contrat Marketplace.
     */
    function getMarketplaceContractAddress() external view returns (address) {
        return address(marketplaceContract);
    }
}
