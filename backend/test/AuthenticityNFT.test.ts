import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer, ZeroAddress } from "ethers";
import { AuthenticityNFT } from "../typechain-types";

describe("AuthenticityNFT", function () {
  // Variables communes
  let nftContract: AuthenticityNFT;
  let owner: Signer;
  let recipient: Signer;
  let royaltyRecipient: Signer;

  // Setup commun
  beforeEach(async function () {
    [owner, recipient, royaltyRecipient] = await ethers.getSigners();

    const AuthenticityNFT = await ethers.getContractFactory("AuthenticityNFT");
    nftContract = (await AuthenticityNFT.deploy()) as AuthenticityNFT;
  });

  // Tests liés au minting d'NFTs
  describe("Minting NFTs", function () {
    it("Should mint a new NFT with royalties", async function () {
      const metadataURI = "ipfs://metadataURI";
      const royaltyFee = 500; // 5%

      const tx = await nftContract
        .connect(owner)
        .mintNFT(
          await recipient.getAddress(),
          metadataURI,
          await royaltyRecipient.getAddress(),
          royaltyFee
        );

      const receipt = await tx.wait();

      if (!receipt) {
        throw new Error("Transaction receipt is null");
      }

      const iface = nftContract.interface;
      const transferLog = receipt.logs.find(
        (log) => iface.parseLog(log)?.name === "Transfer"
      );

      if (!transferLog) {
        throw new Error("Transfer event not found");
      }

      const parsedEvent = iface.parseLog(transferLog);
      if (!parsedEvent) {
        throw new Error("Parsed event is null");
      }
      const tokenId = Number(parsedEvent.args?.tokenId);

      expect(await nftContract.ownerOf(tokenId)).to.equal(
        await recipient.getAddress()
      );
      expect(await nftContract.tokenURI(tokenId)).to.equal(metadataURI);

      const salePrice = 1000;
      const [royaltyAddress, royaltyAmount] = await nftContract.royaltyInfo(
        tokenId,
        salePrice
      );

      expect(royaltyAddress).to.equal(await royaltyRecipient.getAddress());
      expect(royaltyAmount).to.equal((salePrice * royaltyFee) / 10000);
    });

    it("Should map metadataURI to tokenId", async function () {
      const metadataURI = "ipfs://metadataURI";
      const royaltyFee = 500;

      const tx = await nftContract
        .connect(owner)
        .mintNFT(
          await recipient.getAddress(),
          metadataURI,
          await royaltyRecipient.getAddress(),
          royaltyFee
        );

      const receipt = await tx.wait();

      if (!receipt) {
        throw new Error("Transaction receipt is null");
      }

      const iface = nftContract.interface;
      const transferLog = receipt.logs.find(
        (log) => iface.parseLog(log)?.name === "Transfer"
      );

      if (!transferLog) {
        throw new Error("Transfer event not found");
      }

      const parsedEvent = iface.parseLog(transferLog);

      if (!parsedEvent) {
        throw new Error("Parsed event is null");
      }

      const tokenId = Number(parsedEvent.args?.tokenId);

      expect(await nftContract.getTokenIdByMetadata(metadataURI)).to.equal(
        tokenId
      );
    });
  });

  // Tests liés au support des interfaces
  describe("Interface Support", function () {
    it("Should support ERC721 and EIP-2981 interfaces", async function () {
      const ERC721_INTERFACE_ID = "0x80ac58cd";
      const EIP2981_INTERFACE_ID = "0x2a55205a";

      expect(await nftContract.supportsInterface(ERC721_INTERFACE_ID)).to.be
        .true;
      expect(await nftContract.supportsInterface(EIP2981_INTERFACE_ID)).to.be
        .true;
    });
  });

  // Tests liés aux validations et modifiers
  describe("Modifiers and Validation", function () {
    it("Should revert if not owner or marketplace tries to mint", async function () {
      const metadataURI = "ipfs://metadataURI";
      const royaltyFee = 500;

      await expect(
        nftContract
          .connect(recipient)
          .mintNFT(
            await recipient.getAddress(),
            metadataURI,
            await royaltyRecipient.getAddress(),
            royaltyFee
          )
      ).to.be.revertedWith("Not owner or marketplace");
    });

    it("Should revert if royaltyFee exceeds 100%", async function () {
      const metadataURI = "ipfs://metadataURI";
      const royaltyFee = 10001;

      await expect(
        nftContract
          .connect(owner)
          .mintNFT(
            await recipient.getAddress(),
            metadataURI,
            await royaltyRecipient.getAddress(),
            royaltyFee
          )
      ).to.be.revertedWith("Royalty fee exceeds 100%");
    });

    it("Should revert if not owner tries to set marketplace", async function () {
      try {
        await nftContract
          .connect(recipient)
          .setMarketplaceContract(await recipient.getAddress());
      } catch (error: any) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });

    it("Should revert if marketplace address is 0", async function () {
      await expect(
        nftContract.connect(owner).setMarketplaceContract(ZeroAddress)
      ).to.be.revertedWith("Invalid marketplace address");
    });
  });
});
