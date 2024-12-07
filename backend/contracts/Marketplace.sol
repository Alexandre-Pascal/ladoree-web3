// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importation du contrat NFT
import "./AuthenticityNFT.sol";

/// @title Marketplace
/// @dev Contrat pour gérer les ventes initiales et les reventes d'objets physiques liés aux NFTs
contract Marketplace is Ownable {
    // Structure des items en vente
    struct Item {
        uint256 tokenId; // NFT associé à l'objet
        address seller; // Adresse du vendeur
        uint256 price; // Prix de l'objet en euros (ou équivalent)
        bool isSold; // Statut de l'objet (vendu ou non)
    }

    AuthenticityNFT private nftContract; // Instance du contrat AuthenticityNFT
    mapping(uint256 => Item) public itemsForSale; // Mapping des items mis en vente
    uint256 public itemCount; // Compteur pour générer des IDs d'items

    // Événements
    event ItemListed(
        uint256 itemId,
        uint256 tokenId,
        address seller,
        uint256 price
    );
    event ItemSold(uint256 itemId, address buyer, uint256 price);

    /// @dev Initialisation avec l'adresse du contrat NFT
    constructor(address nftAddress) Ownable(msg.sender) {
        nftContract = AuthenticityNFT(nftAddress);
    }

    /// @notice Mettre en vente un objet (vente initiale ou revente)
    /// @param tokenId ID du NFT lié à l'objet
    /// @param price Prix de l'objet
    function listItem(uint256 tokenId, uint256 price) external {
        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "Not the NFT owner"
        );
        require(price > 0, "Price must be greater than zero");

        // Transférer le NFT au contrat pour sécuriser la vente
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId);

        // Enregistrer l'objet en vente
        itemsForSale[itemCount] = Item({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            isSold: false
        });

        emit ItemListed(itemCount, tokenId, msg.sender, price);
        itemCount++;
    }

    /// @notice Acheter un objet mis en vente
    /// @param itemId ID de l'item en vente
    /// @param buyer Adresse de l'acheteur
    function buyItem(uint256 itemId, address buyer) external onlyOwner {
        Item storage item = itemsForSale[itemId];
        require(!item.isSold, "Item already sold");

        // Récupérer les informations de royalties
        (address royaltyRecipient, uint256 royaltyAmount) = nftContract
            .royaltyInfo(item.tokenId, item.price);

        // Calculer les fonds à envoyer au vendeur
        uint256 sellerProceeds = item.price - royaltyAmount;

        // Effectuer les paiements hors chaîne (Stripe, PayPal, etc.)
        payable(item.seller).transfer(sellerProceeds); // Paiement au vendeur
        payable(royaltyRecipient).transfer(royaltyAmount); // Paiement des royalties

        // Transférer le NFT à l'acheteur
        nftContract.safeTransferFrom(address(this), buyer, item.tokenId);

        // Marquer l'objet comme vendu
        item.isSold = true;

        emit ItemSold(itemId, buyer, item.price);
    }

    /// @notice Annuler une vente et récupérer le NFT
    /// @param itemId ID de l'item à annuler
    function cancelListing(uint256 itemId) external {
        Item storage item = itemsForSale[itemId];
        require(item.seller == msg.sender, "Not the seller");
        require(!item.isSold, "Item already sold");

        // Transférer le NFT au vendeur
        nftContract.safeTransferFrom(address(this), msg.sender, item.tokenId);

        // Supprimer l'annonce
        delete itemsForSale[itemId];
    }

    /// @notice Permet au contrat de recevoir des fonds
    receive() external payable {}
}
