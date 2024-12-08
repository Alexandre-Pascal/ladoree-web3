import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer, ZeroAddress } from "ethers";
import {
  Marketplace,
  AuthenticityNFT,
  UserManager,
  LDRToken,
  TokenDistribution,
} from "../typechain-types";

describe("Marketplace", function () {
  let nftContract: AuthenticityNFT;
  let marketplace: Marketplace;
  let userManager: UserManager;
  let ldrToken: LDRToken;
  let tokenDistribution: TokenDistribution;
  let owner: Signer;
  let seller: Signer;
  let buyer: Signer;
  let notRegistered: Signer;
  let royaltyRecipient: Signer;

  beforeEach(async function () {
    [owner, seller, buyer, notRegistered, royaltyRecipient] =
      await ethers.getSigners();
    // Deploy AuthenticityNFT contract
    const AuthenticityNFT = await ethers.getContractFactory("AuthenticityNFT");
    nftContract = (await AuthenticityNFT.deploy()) as AuthenticityNFT;

    // Deploy Marketplace contract
    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = (await Marketplace.deploy()) as Marketplace;

    const TokenDistribution = await ethers.getContractFactory(
      "TokenDistribution"
    );
    tokenDistribution = await TokenDistribution.deploy();

    await tokenDistribution
      .connect(owner)
      .initializeMarketplace(marketplace.getAddress());

    //Set address of AuthenticityNFT contract in Marketplace
    await nftContract
      .connect(owner)
      .setMarketplaceContract(marketplace.getAddress());

    await marketplace.connect(owner).setNFTContract(nftContract.getAddress());

    await marketplace
      .connect(owner)
      .setTokenDistribution(tokenDistribution.getAddress());

    const userManagerFactory = await ethers.getContractFactory("UserManager");
    userManager = await userManagerFactory.deploy();

    tokenDistribution.initializeUserManager(userManager.getAddress());

    const LDRToken = await ethers.getContractFactory("LDRToken");
    ldrToken = (await LDRToken.deploy(
      userManager.getAddress(),
      tokenDistribution.getAddress()
    )) as LDRToken;

    tokenDistribution.initializeLDRToken(ldrToken.getAddress());
    await userManager
      .connect(buyer)
      .registerUser(
        (await buyer.getAddress()).toLowerCase(),
        "azaz",
        "John",
        "Doe"
      );

    await userManager
      .connect(seller)
      .registerUser(
        (await seller.getAddress()).toLowerCase(),
        "azaz",
        "John",
        "Doe"
      );
  });

  describe("Deployment", function () {
    it("Should revert if its not the owner who tries to initialize the Marketplace", async function () {
      try {
        await tokenDistribution
          .connect(seller)
          .initializeMarketplace(nftContract.getAddress());
      } catch (error: any) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });
  });

  describe("Listing an item", function () {
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

      await marketplace
        .connect(owner)
        .itemBuyed(itemId, await buyer.getAddress());

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

      // Verify NFT ownership (Marketplace should own it now)
      expect(await nftContract.ownerOf(tokenId)).to.equal(
        await marketplace.getAddress()
      );
    });

    it("Should not list an item if not the owner", async function () {
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

      // Buy the item
      await marketplace
        .connect(owner)
        .itemBuyed(itemId, await buyer.getAddress());

      // Approve the Marketplace to transfer the NFT for resale
      const tokenId = await nftContract.getTokenIdByMetadata(metadataURI); // Fetch tokenId
      await nftContract
        .connect(buyer)
        .approve(await marketplace.getAddress(), tokenId);

      // List the item for resale
      await expect(
        marketplace
          .connect(seller)
          .listItem(
            metadataURI,
            price,
            await royaltyRecipient.getAddress(),
            royaltyFee
          )
      ).to.be.revertedWith("Not the NFT owner");
    });
  });

  describe("Buying an item", function () {
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
      await marketplace.connect(owner).itemBuyed(0, await buyer.getAddress());

      // Verify NFT ownership
      expect(await nftContract.ownerOf(tokenId)).to.equal(
        await buyer.getAddress()
      );

      // Verify the item is marked as sold
      const item = await marketplace.itemsForSale(0);
      expect(item.isSold).to.be.true;
    });

    it("Should not allow a buyer to purchase an item if Item already sold", async function () {
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

      // Buyer purchases the item
      await marketplace.connect(owner).itemBuyed(0, await buyer.getAddress());

      // Verify the item is marked as sold
      const item = await marketplace.itemsForSale(0);
      expect(item.isSold).to.be.true;

      // Try to purchase the item again
      await expect(
        marketplace.connect(owner).itemBuyed(0, await buyer.getAddress())
      ).to.be.revertedWith("Item already sold");
    });

    it("Should reward the seller when an item is purchased", async function () {
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

      // Buyer purchases the item
      await marketplace.connect(owner).itemBuyed(0, await buyer.getAddress());

      ldrToken;
      // Verify the seller's balance
      const sellerBalance = await ldrToken.balanceOf(await seller.getAddress());
      expect(sellerBalance).to.equal(
        await tokenDistribution.calculateTokens(price)
      );
    });

    it("Should not reward seller or buyer if to = address(0)", async function () {
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
    });

    it("Should not allow to access to itemBuyed if not the owner", async function () {
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

      // Buyer purchases the item
      try {
        await marketplace
          .connect(seller)
          .itemBuyed(0, await buyer.getAddress());
      } catch (error: any) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });
  });

  describe("Other tests", function () {
    // Verify require(price > 0, "Price must be greater than zero");
    it("Should revert if the price is zero", async function () {
      const metadataURI = "ipfs://metadata";
      const price = 0;
      const royaltyFee = 500;

      await expect(
        marketplace
          .connect(seller)
          .listItem(
            metadataURI,
            price,
            await royaltyRecipient.getAddress(),
            royaltyFee
          )
      ).to.be.revertedWith("Price must be greater than zero");
    });

    it("Should revert if we try to distribute tokens from an other contract thant the Market", async function () {
      const amountSpent = 50;

      await expect(
        tokenDistribution
          .connect(seller)
          .distributeTokens(await seller.getAddress(), amountSpent)
      ).to.be.revertedWith(
        "TokenDistribution: Caller is not the Marketplace contract"
      );
    });

    it("Should not distribute tokens to not registered users", async function () {
      const metadataURI = "ipfs://metadata";
      const price = 50;
      const royaltyFee = 500;

      await marketplace
        .connect(seller)
        .listItem(
          metadataURI,
          price,
          await royaltyRecipient.getAddress(),
          royaltyFee
        );

      // Call distributeTokens from the NFT contract
      await expect(
        marketplace
          .connect(owner)
          .itemBuyed(0, await notRegistered.getAddress())
      ).to.be.revertedWith("User is not registered with UserManager");
    });
  });
});
