// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ========================
// IMPORTATIONS
// ========================
import "./AuthenticityNFT.sol";
import "./TokenDistribution.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// ========================
// INTERFACES
// ========================
interface IMarketplace {
    function listItem(
        string memory metadataURI,
        uint256 price,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external;

    function itemBuyed(uint256 itemId, address buyer) external;
}

// ========================
// CONTRAT PRINCIPAL
// ========================
/**
 * @title Marketplace
 * @notice Contrat pour gérer les ventes initiales et reventes d'objets physiques liés aux NFTs.
 * @dev Implémente IERC721Receiver et utilise Ownable pour la gestion des droits.
 */
contract Marketplace is IERC721Receiver, Ownable {
    // ========================
    // STRUCTURES ET VARIABLES
    // ========================
    struct Item {
        uint256 tokenId; // NFT associé à l'objet
        address seller; // Adresse du vendeur
        uint256 price; // Prix de l'objet en euros (ou équivalent)
        bool isSold; // Statut de l'objet (vendu ou non)
    }

    IAuthenticityNFT private nftContract; // Instance du contrat AuthenticityNFT
    ITokenDistribution private tokenDistribution; // Instance du contrat TokenDistribution
    mapping(uint256 => Item) public itemsForSale; // Mapping des items mis en vente
    uint256 public itemCount; // Compteur pour générer des IDs d'items

    // ========================
    // ÉVÉNEMENTS
    // ========================
    event ItemListed(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event ItemSold(
        uint256 indexed itemId,
        address indexed buyer,
        uint256 price
    );

    // ========================
    // CONSTRUCTEUR
    // ========================
    /**
     * @notice Initialise le contrat et assigne le propriétaire.
     */
    constructor() Ownable(msg.sender) {}

    // ========================
    // FONCTIONS PUBLIQUES
    // ========================
    /**
     * @notice Implémentation de IERC721Receiver pour accepter les transferts sécurisés de NFTs.
     */
    function onERC721Received(
        address /*operator*/,
        address /*from*/,
        uint256 /*tokenId*/,
        bytes calldata /*data*/
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /**
     * @notice Met en vente un item (création de NFT si nécessaire).
     * @param metadataURI URI des métadonnées si le NFT n'existe pas encore.
     * @param price Prix de l'objet.
     * @param royaltyRecipient Adresse recevant les royalties.
     * @param royaltyFee Taux des royalties en basis points.
     */
    function listItem(
        string memory metadataURI,
        uint256 price,
        address royaltyRecipient,
        uint96 royaltyFee
    ) external {
        require(price > 0, "Price must be greater than zero");

        uint256 tokenId;

        if (!nftExists(metadataURI)) {
            // Mint le NFT si c'est une première vente
            tokenId = nftContract.mintNFT(
                address(this),
                metadataURI,
                royaltyRecipient,
                royaltyFee
            );
        } else {
            // Vérifie que l'appelant est propriétaire du NFT pour une revente
            tokenId = nftContract.getTokenIdByMetadata(metadataURI);
            require(
                nftContract.ownerOf(tokenId) == msg.sender,
                "Not the NFT owner"
            );
            nftContract.safeTransferFrom(msg.sender, address(this), tokenId);
        }

        itemsForSale[itemCount] = Item({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            isSold: false
        });

        emit ItemListed(itemCount, tokenId, msg.sender, price);
        itemCount++;
    }

    /**
     * @notice Acheter une création (paiement hors blockchain).
     * @param itemId ID de l'item en vente.
     * @param buyer Adresse de l'acheteur.
     */
    function itemBuyed(uint256 itemId, address buyer) external onlyOwner {
        Item storage item = itemsForSale[itemId];
        require(!item.isSold, "Item already sold");

        nftContract.safeTransferFrom(address(this), buyer, item.tokenId);
        item.isSold = true;

        emit ItemSold(itemId, buyer, item.price);

        // Distribution des tokens LDR
        tokenDistribution.distributeTokens(buyer, item.price);
        tokenDistribution.distributeTokens(item.seller, item.price);
    }

    // ========================
    // FONCTIONS INTERNES
    // ========================
    /**
     * @notice Vérifie si un NFT existe pour une URI donnée.
     * @param metadataURI URI des métadonnées du NFT.
     * @return bool Vrai si le NFT existe, faux sinon.
     */
    function nftExists(string memory metadataURI) public view returns (bool) {
        try nftContract.getTokenIdByMetadata(metadataURI) {
            return true;
        } catch {
            return false;
        }
    }

    // ========================
    // FONCTIONS ADMIN
    // ========================
    /**
     * @notice Définit l'adresse du contrat AuthenticityNFT.
     * @param authenticityNftAddress Adresse du contrat AuthenticityNFT.
     */
    function setAuthenticityNFTContract(
        address authenticityNftAddress
    ) external onlyOwner {
        nftContract = IAuthenticityNFT(authenticityNftAddress);
    }

    /**
     * @notice Définit l'adresse du contrat TokenDistribution.
     * @param tokenDistributionAddress Adresse du contrat TokenDistribution.
     */
    function setTokenDistributionContract(
        address tokenDistributionAddress
    ) external onlyOwner {
        tokenDistribution = ITokenDistribution(tokenDistributionAddress);
    }

    // ===============================================================
    // FONCTIONS DE RÉCUPÉRATION DES ADDRESSES DES CONTRATS DÉPENDANTS
    // ===============================================================
    /**
     * @notice Récupère l'adresse du contrat TokenDistribution.
     * @return Adresse du contrat TokenDistribution.
     */
    function getTokenDistributionContractAddress()
        external
        view
        returns (address)
    {
        return address(tokenDistribution);
    }

    /**
     * @notice Récupère l'adresse du contrat AuthenticityNFT.
     * @return Adresse du contrat AuthenticityNFT.
     */
    function getAuthenticityNFTContractAddress()
        external
        view
        returns (address)
    {
        return address(nftContract);
    }
}
