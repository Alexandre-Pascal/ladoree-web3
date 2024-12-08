// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importation du contrat NFT
import "./AuthenticityNFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IMarketplace {
    function listItem(
        string memory metadataURI,
        uint256 price,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external;

    function buyItem(uint256 itemId, address buyer) external;
}

/// @title Marketplace
/// @dev Contrat pour gérer les ventes initiales et les reventes d'objets physiques liés aux NFTs
contract Marketplace is IERC721Receiver {
    // Structure des items en vente
    struct Item {
        uint256 tokenId;  // NFT associé à l'objet
        address seller;   // Adresse du vendeur
        uint256 price;    // Prix de l'objet en euros (ou équivalent)
        bool isSold;      // Statut de l'objet (vendu ou non)
    }

    AuthenticityNFT private nftContract; // Instance du contrat AuthenticityNFT
    mapping(uint256 => Item) public itemsForSale; // Mapping des items mis en vente
    uint256 public itemCount; // Compteur pour générer des IDs d'items

    // Événements
    event ItemListed(uint256 itemId, uint256 tokenId, address seller, uint256 price);
    event ItemSold(uint256 itemId, address buyer, uint256 price);

    /// @dev Initialisation avec l'adresse du contrat NFT
    constructor(address nftAddress) {
        nftContract = AuthenticityNFT(nftAddress);
    }

    /// @notice Implémentation de IERC721Receiver pour accepter les transferts sécurisés de NFTs
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /// @notice Mettre en vente une création (mint automatique si nécessaire)
    /// @param metadataURI URI des métadonnées si le NFT n'existe pas encore
    /// @param price Prix de l'objet
    /// @param royaltyRecipient Adresse recevant les royalties (créateur)
    /// @param royaltyFee Taux des royalties en basis points
    function listItem(
        string memory metadataURI,
        uint256 price,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external {
        require(price > 0, "Price must be greater than zero");

        uint256 tokenId;

        // Vérifie si c'est une première vente ou une revente
        if (!nftExists(metadataURI)) {
            // Première vente : Mint le NFT et l’associe au Marketplace
            tokenId = nftContract.mintNFT(address(this), metadataURI, royaltyRecipient, royaltyFee);
        } else {
            // Revente : Vérifie la propriété et transfère le NFT au Marketplace
            tokenId = nftContract.getTokenIdByMetadata(metadataURI); // Associe le tokenId existant
            require(nftContract.ownerOf(tokenId) == msg.sender, "Not the NFT owner");

            // Transfère le NFT au Marketplace
            nftContract.safeTransferFrom(msg.sender, address(this), tokenId);
        }

        // Enregistre l'objet en vente
        itemsForSale[itemCount] = Item({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            isSold: false
        });

        emit ItemListed(itemCount, tokenId, msg.sender, price);
        itemCount++;
    }

    /// @notice Acheter une création (paiement hors blockchain)
    /// @param itemId ID de l'item en vente
    /// @param buyer Adresse de l'acheteur
    function buyItem(uint256 itemId, address buyer) external {
        Item storage item = itemsForSale[itemId];
        require(!item.isSold, "Item already sold");

        // Transférer le NFT à l'acheteur
        nftContract.safeTransferFrom(address(this), buyer, item.tokenId);

        // Marquer l'objet comme vendu
        item.isSold = true;

        emit ItemSold(itemId, buyer, item.price);
    }

    /// @notice Vérifie si un NFT existe pour une URI donnée
    function nftExists(string memory metadataURI) public view returns (bool) {
        try nftContract.getTokenIdByMetadata(metadataURI) {
            return true; // Le NFT existe
        } catch {
            return false; // Le NFT n'existe pas
        }
    }
}
