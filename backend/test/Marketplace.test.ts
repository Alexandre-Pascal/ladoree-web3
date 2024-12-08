import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { Marketplace, AuthenticityNFT } from "../typechain-types";

describe("Marketplace", function () {
  let nftContract: AuthenticityNFT;
  let marketplace: Marketplace;
  let owner: Signer;
  let seller: Signer;
  let buyer: Signer;
  let reseller: Signer;
  let royaltyRecipient: Signer;

  beforeEach(async function () {
    [owner, seller, buyer, royaltyRecipient] = await ethers.getSigners();

    // Deploy AuthenticityNFT contract
    const AuthenticityNFT = await ethers.getContractFactory("AuthenticityNFT");
    nftContract = (await AuthenticityNFT.deploy()) as AuthenticityNFT;

    // Deploy Marketplace contract
    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = (await Marketplace.deploy(
      nftContract.getAddress()
    )) as Marketplace;

    //Set address of AuthenticityNFT contract in Marketplace
    await nftContract
      .connect(owner)
      .setMarketplaceContract(marketplace.getAddress());
  });

  it("Should list an item for the first sale", async function () {
    const metadataURI = "ipfs://metadata";
    const price = 1000; // Prix en euros
    const royaltyFee = 500; // 5%

    const royaltyRecipiente = await royaltyRecipient.getAddress();

    // List an item for sale
    const tx = await marketplace
      .connect(seller)
      .listItem(metadataURI, price, royaltyRecipiente, royaltyFee);

    // Attends le receipt et décode les logs
    const receipt = await tx.wait();
    const iface = marketplace.interface;

    if (!receipt) {
      throw new Error("No logs found");
    }

    // Recherche l'événement "ItemListed"
    const eventLog = receipt.logs.find(
      (log) => iface.parseLog(log)?.name === "ItemListed"
    );

    if (!eventLog) {
      throw new Error("ItemListed event not found");
    }

    const parsedEvent = iface.parseLog(eventLog);
    if (!parsedEvent) {
      throw new Error("Parsed event is null");
    }

    const itemId = parsedEvent.args.itemId;

    // Verify item details
    const item = await marketplace.itemsForSale(itemId);

    const tokenID = Number(item.tokenId);

    expect(tokenID).to.be.a("number");
    expect(item.seller).to.equal(await seller.getAddress());
    expect(item.price).to.equal(price);
    expect(item.isSold).to.be.false;

    // Verify NFT ownership
    const tokenId = await nftContract.getTokenIdByMetadata(metadataURI);
    expect(await nftContract.ownerOf(tokenId)).to.equal(
      await marketplace.getAddress()
    );
  });

  it("Should allow a buyer to purchase an item", async function () {
    const metadataURI = "ipfs://metadata";
    const price = 1000; // Prix en euros
    const royaltyFee = 500;

    // List the item for sale
    await marketplace
      .connect(seller)
      .listItem(
        metadataURI,
        price,
        await royaltyRecipient.getAddress(),
        royaltyFee
      );

    const tokenId = await nftContract.getTokenIdByMetadata(metadataURI);

    // Buyer purchases the item
    await marketplace.connect(owner).buyItem(0, await buyer.getAddress());

    // Verify NFT ownership
    expect(await nftContract.ownerOf(tokenId)).to.equal(
      await buyer.getAddress()
    );

    // Verify the item is marked as sold
    const item = await marketplace.itemsForSale(0);
    expect(item.isSold).to.be.true;
  });

  it("Should list an item for resale", async function () {
    const metadataURI = "ipfs://resale-metadata";
    const price = 1000; // Prix en euros
    const royaltyFee = 500;

    // List an item for sale (first sale)
    const txToken = await marketplace
      .connect(seller)
      .listItem(
        metadataURI,
        price,
        await royaltyRecipient.getAddress(),
        royaltyFee
      );

    // Decode logs from receipt
    const receipt = await txToken.wait();
    const iface = marketplace.interface;

    if (!receipt) {
      throw new Error("No logs found");
    }

    // Find "ItemListed" event
    const eventLog = receipt.logs.find(
      (log) => iface.parseLog(log)?.name === "ItemListed"
    );

    if (!eventLog) {
      throw new Error("ItemListed event not found");
    }

    const parsedEvent = iface.parseLog(eventLog);
    if (!parsedEvent) {
      throw new Error("Parsed event is null");
    }

    const itemId = parsedEvent.args.itemId;

    console.log("Premier item mis en vente : ", itemId);

    // Buy the item
    await marketplace.connect(buyer).buyItem(itemId, await buyer.getAddress());
    console.log("Item acheté : ", itemId);

    // Approve the Marketplace to transfer the NFT for resale
    const tokenId = await nftContract.getTokenIdByMetadata(metadataURI); // Fetch tokenId
    await nftContract
      .connect(buyer)
      .approve(await marketplace.getAddress(), tokenId);

    // List the item for resale
    const tx = await marketplace
      .connect(buyer)
      .listItem(
        metadataURI,
        price,
        await royaltyRecipient.getAddress(),
        royaltyFee
      );

    await tx.wait();

    console.log("Item remis en vente : ", itemId);

    // Verify NFT ownership (Marketplace should own it now)
    expect(await nftContract.ownerOf(tokenId)).to.equal(
      await marketplace.getAddress()
    );
  });
});
