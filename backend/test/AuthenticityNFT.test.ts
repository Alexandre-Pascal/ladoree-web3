import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { AuthenticityNFT } from "../typechain-types";

describe("AuthenticityNFT", function () {
  let nftContract: AuthenticityNFT;
  let owner: Signer;
  let recipient: Signer;
  let royaltyRecipient: Signer;

  beforeEach(async function () {
    [owner, recipient, royaltyRecipient] = await ethers.getSigners();

    const AuthenticityNFT = await ethers.getContractFactory("AuthenticityNFT");
    nftContract = (await AuthenticityNFT.deploy()) as AuthenticityNFT;
  });

  it("Should mint a new NFT with royalties", async function () {
    const metadataURI = "ipfs://metadataURI";
    const royaltyFee = 500; // 5%

    // Mint a new NFT
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

    // Decode logs to extract the Transfer event
    const iface = nftContract.interface; // Interface of the contract
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

    // Verify ownership
    expect(await nftContract.ownerOf(tokenId)).to.equal(
      await recipient.getAddress()
    );

    // Verify metadata URI
    expect(await nftContract.tokenURI(tokenId)).to.equal(metadataURI);

    // Verify royalties
    const salePrice = 1000; // Exemple de prix en euros
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

    // Mint a new NFT
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

    // Decode logs to extract the Transfer event
    const iface = nftContract.interface; // Interface of the contract
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

    // Verify mapping
    expect(await nftContract.getTokenIdByMetadata(metadataURI)).to.equal(
      tokenId
    );
  });

  it("Should support ERC721 and EIP-2981 interfaces", async function () {
    const ERC721_INTERFACE_ID = "0x80ac58cd";
    const EIP2981_INTERFACE_ID = "0x2a55205a";

    expect(await nftContract.supportsInterface(ERC721_INTERFACE_ID)).to.be.true;
    expect(await nftContract.supportsInterface(EIP2981_INTERFACE_ID)).to.be
      .true;
  });
});
