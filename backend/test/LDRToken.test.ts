import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { LDRToken, UserManager, TokenDistribution } from "../typechain-types";

describe("LDRToken", function () {
  let ldrToken: LDRToken;
  let userManager: UserManager;
  let tokenDistribution: TokenDistribution;
  let owner: Signer;
  let user1: Signer;
  let user2: Signer;

  beforeEach(async function () {
    // Deploy mocks for UserManager and TokenDistribution
    const UserManagerMock = await ethers.getContractFactory("UserManager");
    userManager = (await UserManagerMock.deploy()) as UserManager;

    const TokenDistributionMock = await ethers.getContractFactory(
      "TokenDistribution"
    );
    tokenDistribution =
      (await TokenDistributionMock.deploy()) as TokenDistribution;

    // Deploy LDRToken
    const LDRTokenFactory = await ethers.getContractFactory("LDRToken");
    [owner, user1, user2] = await ethers.getSigners();
    ldrToken = (await LDRTokenFactory.deploy(
      userManager.getAddress(),
      tokenDistribution.getAddress()
    )) as LDRToken;
  });

  describe("Deployment", function () {
    it("Should initialize the contract with correct parameters", async function () {
      expect(await ldrToken.name()).to.equal("Ladoree Token");
      expect(await ldrToken.symbol()).to.equal("LDR");
      expect(await ldrToken.owner()).to.equal(await owner.getAddress());
    });
  });

  describe("Mint", function () {
    beforeEach(async function () {
      const addressUser1 = await user1.getAddress();
      // Mock registering a user in UserManager
      await userManager
        .connect(user1)
        .registerUser(addressUser1, "abcd@gmail.com", "John", "Doe");

      // Set LDRToken as the token contract in UserManager
      await userManager.connect(owner).setTokenContract(ldrToken.getAddress());
    });

    it("Should allow the owner to mint monthly tokens", async function () {
      const amountToMint = 50;

      await ldrToken.connect(owner).mint(user1.getAddress(), 50);

      expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(
        amountToMint
      );
    });

    it("Should reject minting if less than 30 days have passed since the last mint", async function () {
      const amountToMint = 50;

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);
      await expect(
        ldrToken.connect(owner).mint(user1.getAddress(), amountToMint)
      ).to.be.revertedWith("LDRToken: Can only mint once per month");
    });

    it("Should adjust mint to respect the cap of 200 tokens", async function () {
      const largeAmount = 300;

      await ldrToken.connect(owner).mint(user1.getAddress(), largeAmount);

      expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(200);
    });

    it("Should emit MintAttemptedWithMaxBalance if minting would exceed the cap", async function () {
      await ldrToken.connect(owner).mint(user1.getAddress(), 200);

      await userManager.connect(owner).resetLastMintTime(user1.getAddress());

      await expect(ldrToken.connect(owner).mint(user1.getAddress(), 100))
        .to.emit(ldrToken, "MintAttemptedWithMaxBalance")
        .withArgs(user1.getAddress(), 200);
    });
  });

  describe("Mint Reward", function () {
    // PAS ENCORE UTILISABLE CAR CEST LE NFT MARKETPLACE QUI APPELLE DISTRIBUTETOKENS QUI APPELLE MINTREWARD
    // it("Should allow TokenDistribution to call mintReward", async function () {
    // const amountToMint = 50

    // await tokenDistribution
    //     .connect(owner).distributeTokens(user1.getAddress(), amountToMint);
    // //Distribute token uses mintReward
    // expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(amountToMint);
    // });

    it("Should reject mintReward calls from unauthorized addresses", async function () {
      const amountToMint = 50;

      await expect(
        ldrToken.connect(user2).mintReward(user1.getAddress(), amountToMint)
      ).to.be.revertedWith("LDRToken: Unauthorized caller");
    });

    //PAS ENCORE UTILISABLE CAR CEST LE NFT MARKETPLACE QUI APPELLE DISTRIBUTETOKENS QUI APPELLE MINTREWARD
    // it("Should respect the 200-token cap for mintReward", async function () {
    //     const largeAmount = ethers.parseEther("300");

    //     // await ldrToken
    //     //     .connect(owner)
    //     //     .setAuthorizedContract(tokenDistribution.getAddress());

    //     await ldrToken
    //         .connect(owner)
    //         .mintReward(user1.getAddress(), largeAmount);

    //     expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(
    //         ethers.parseEther("200")
    //     );
    // });
  });

  describe("Use Token", function () {
    beforeEach(async function () {
      await userManager.connect(owner).setTokenContract(ldrToken.getAddress());
    });
    it("Should allow users buy discount for buyers", async function () {
      const amountToMint = 70;

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

      await ldrToken.connect(user1).buyBuyersDiscount(50);

      expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(
        amountToMint - 50
      );
    });

    it("Should emit BuyerDiscountBought event on successful buy", async function () {
      const amountToMint = 70;

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

      await expect(ldrToken.connect(user1).buyBuyersDiscount(50))
        .to.emit(ldrToken, "BuyerDiscountBought")
        .withArgs(user1.getAddress(), 50);
    });

    it("Should allow users buy discount for sellers", async function () {
      const amountToMint = 70;

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

      await ldrToken.connect(user1).buySellersDiscount(50);

      expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(
        amountToMint - 50
      );
    });

    it("Should emit SellerDiscountBought event on successful buy", async function () {
      const amountToMint = 70;

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

      await expect(ldrToken.connect(user1).buySellersDiscount(50))
        .to.emit(ldrToken, "SellerDiscountBought")
        .withArgs(user1.getAddress(), 50);
    });

    it("Should revert if user tries to buy a buyer discount with insufficient balance", async function () {
      const amountToMint = 70;

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

      await expect(
        ldrToken.connect(user1).buyBuyersDiscount(100)
      ).to.be.revertedWith("LDRToken: Insufficient balance");
    });

    it("Sould revert if user tries to buy a seller discount with insufficient balance", async function () {
      const amountToMint = 70;

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

      await expect(
        ldrToken.connect(user1).buySellersDiscount(100)
      ).to.be.revertedWith("LDRToken: Insufficient balance");
    });
  });

  describe("Modifiers", function () {
    it("checkMinAndMax200Tokens should prevent mint if amount is 0", async function () {
      await userManager.connect(owner).setTokenContract(ldrToken.getAddress());

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await expect(
        ldrToken.connect(owner).mint(user1.getAddress(), 0)
      ).to.be.revertedWith("LDRToken: Amount to mint must be greater than 0");
    });

    it("onlyTokenDistribution should restrict access to TokenDistribution", async function () {
      const amountToMint = 50;

      await expect(
        ldrToken.connect(user1).mintReward(user2.getAddress(), amountToMint)
      ).to.be.revertedWith("LDRToken: Unauthorized caller");
    });
  });

  describe("Edge Cases", function () {
    it("Should reject mint if user address is null", async function () {
      await expect(
        ldrToken.connect(owner).mint(ethers.ZeroAddress, 100)
      ).to.be.revertedWith("LDRToken: Invalid address");
    });

    it("Should emit TokensMinted event on successful mint", async function () {
      await userManager.connect(owner).setTokenContract(ldrToken.getAddress());

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      const amountToMint = 50;

      await expect(
        ldrToken.connect(owner).mint(user1.getAddress(), amountToMint)
      )
        .to.emit(ldrToken, "TokensMinted")
        .withArgs(user1.getAddress(), amountToMint);
    });

    it("Should emit MintAdjusted if minting would exceed the cap", async function () {
      const amountToMint = 180;
      const amountToMint2 = 50;

      await userManager.connect(owner).setTokenContract(ldrToken.getAddress());

      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

      await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

      await userManager.connect(owner).resetLastMintTime(user1.getAddress());

      await expect(
        ldrToken.connect(owner).mint(user1.getAddress(), amountToMint2)
      )
        .to.emit(ldrToken, "MintAdjusted")
        .withArgs(user1.getAddress(), amountToMint2, 200 - amountToMint);
    });

    it("Should revert if the amount to burn is 0", async function () {
      await expect(
        ldrToken.connect(user1).buyBuyersDiscount(0)
      ).to.be.revertedWith("LDRToken: Amount to burn must be greater than 0");
    });
  });
});
