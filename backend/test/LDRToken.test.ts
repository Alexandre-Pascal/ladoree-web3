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
    const UserManagerMock = await ethers.getContractFactory("UserManager");
    userManager = (await UserManagerMock.deploy()) as UserManager;

    const TokenDistributionMock = await ethers.getContractFactory(
      "TokenDistribution"
    );
    tokenDistribution =
      (await TokenDistributionMock.deploy()) as TokenDistribution;

    const LDRTokenFactory = await ethers.getContractFactory("LDRToken");
    [owner, user1, user2] = await ethers.getSigners();
    ldrToken = (await LDRTokenFactory.deploy()) as LDRToken;

    await ldrToken.connect(owner).setTokenDistribution(tokenDistribution.getAddress());
    await ldrToken.connect(owner).setUserManager(userManager.getAddress());
    // await userManager.connect(owner).setTokenContract(ldrToken.getAddress());
    // await tokenDistribution.connect(owner).setLDRToken(ldrToken.getAddress());
    // await tokenDistribution.connect(owner).setUserManager(userManager.getAddress());

  });

  describe("Deployment", function () {
    it("Should initialize the contract with correct parameters", async function () {
      expect(await ldrToken.name()).to.equal("Ladoree Token");
      expect(await ldrToken.symbol()).to.equal("LDR");
      expect(await ldrToken.owner()).to.equal(await owner.getAddress());
    });

    it("Should not initialize setTokenDistribution if not called by the owner", async function () {
      try {
        await ldrToken
          .connect(user1)
          .setTokenDistribution(tokenDistribution.getAddress());
      } catch (error: any) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });

    it("Should not initialize setUserManager if not called by the owner", async function () {
      try {
        await ldrToken.connect(user1).setUserManager(userManager.getAddress());
      } catch (error: any) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      };
    });
  });
  describe("Token Minting", function () {
    // Common setup for minting tests
    async function setupUserForMinting() {
      const addressUser1 = await user1.getAddress();
      await userManager
        .connect(user1)
        .registerUser(addressUser1, "abcd@gmail.com", "John", "Doe", false);
      await userManager.connect(owner).setTokenContract(ldrToken.getAddress());
    }

    context("Successful Minting", function () {
      beforeEach(async function () {
        await setupUserForMinting();
      });

      it("Should allow the owner to mint monthly tokens", async function () {
        const amountToMint = 50;

        await ldrToken.connect(owner).mint(user1.getAddress(), 50);

        expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(
          amountToMint
        );
      });

      it("Should emit TokensMinted event on successful mint", async function () {
        const amountToMint = 50;

        await expect(
          ldrToken.connect(owner).mint(user1.getAddress(), amountToMint)
        )
          .to.emit(ldrToken, "TokensMinted")
          .withArgs(user1.getAddress(), amountToMint);
      });
    });

    context("Minting Restrictions", function () {
      beforeEach(async function () {
        await setupUserForMinting();
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

      it("Should emit MintAdjusted if minting would exceed the cap", async function () {
        const amountToMint = 180;
        const amountToMint2 = 50;

        await ldrToken.connect(owner).mint(user1.getAddress(), amountToMint);

        await userManager.connect(owner).resetLastMintTime(user1.getAddress());

        await expect(
          ldrToken.connect(owner).mint(user1.getAddress(), amountToMint2)
        )
          .to.emit(ldrToken, "MintAdjusted")
          .withArgs(user1.getAddress(), amountToMint2, 200 - amountToMint);
      });
    });

    context("Minting Validation", function () {
      beforeEach(async function () {
        await setupUserForMinting();
      });

      it("Should reject mint if user address is null", async function () {
        await expect(
          ldrToken.connect(owner).mint(ethers.ZeroAddress, 100)
        ).to.be.revertedWith("LDRToken: Invalid address");
      });

      it("Should prevent mint if amount is 0", async function () {
        await expect(
          ldrToken.connect(owner).mint(user1.getAddress(), 0)
        ).to.be.revertedWith("LDRToken: Amount to mint must be greater than 0");
      });
    });
  });

  describe("Reward Minting", function () {
    it("Should reject mintReward calls from unauthorized addresses", async function () {
      const amountToMint = 50;

      await expect(
        ldrToken.connect(user2).mintReward(user1.getAddress(), amountToMint)
      ).to.be.revertedWith("LDRToken: Unauthorized caller");
    });
  });

  describe("Token Usage", function () {
    // Common setup for token usage tests
    async function setupUserWithTokens(amount: number = 70) {
      await userManager.connect(owner).setTokenContract(ldrToken.getAddress());
      await userManager
        .connect(user1)
        .registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe", false);
      await ldrToken.connect(owner).mint(user1.getAddress(), amount);
    }

    context("Buyers Discount", function () {
      beforeEach(async function () {
        await setupUserWithTokens();
      });

      it("Should allow users to buy discount for buyers", async function () {
        await ldrToken.connect(user1).buyBuyersDiscount(50);

        expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(20);
      });

      it("Should emit BuyerDiscountBought event on successful buy", async function () {
        await expect(ldrToken.connect(user1).buyBuyersDiscount(50))
          .to.emit(ldrToken, "BuyerDiscountBought")
          .withArgs(user1.getAddress(), 50);
      });

      it("Should revert if user tries to buy with insufficient balance", async function () {
        await expect(
          ldrToken.connect(user1).buyBuyersDiscount(100)
        ).to.be.revertedWith("LDRToken: Insufficient balance");
      });
    });

    context("Sellers Discount", function () {
      beforeEach(async function () {
        await setupUserWithTokens();
      });

      it("Should allow users to buy discount for sellers", async function () {
        await ldrToken.connect(user1).buySellersDiscount(50);

        expect(await ldrToken.balanceOf(user1.getAddress())).to.equal(20);
      });

      it("Should emit SellerDiscountBought event on successful buy", async function () {
        await expect(ldrToken.connect(user1).buySellersDiscount(50))
          .to.emit(ldrToken, "SellerDiscountBought")
          .withArgs(user1.getAddress(), 50);
      });

      it("Should revert if user tries to buy with insufficient balance", async function () {
        await expect(
          ldrToken.connect(user1).buySellersDiscount(100)
        ).to.be.revertedWith("LDRToken: Insufficient balance");
      });
    });

    context("Discount Purchase Validation", function () {
      beforeEach(async function () {
        await setupUserWithTokens();
      });

      it("Should revert if the amount to burn is 0", async function () {
        await expect(
          ldrToken.connect(user1).buyBuyersDiscount(0)
        ).to.be.revertedWith("LDRToken: Amount to burn must be greater than 0");
      });
    });
  });

  describe("Access Control", function () {
    it("onlyTokenDistribution should restrict access to TokenDistribution", async function () {
      const amountToMint = 50;

      await expect(
        ldrToken.connect(user1).mintReward(user2.getAddress(), amountToMint)
      ).to.be.revertedWith("LDRToken: Unauthorized caller");
    });
  });

  describe("Get address of contracts", function () {
    it("Should return the address of the UserManager contract", async function () {
      expect(await ldrToken.getUserManagerAddress()).to.equal(await userManager.getAddress());
    });

    it("Should return the address of the TokenDistribution contract", async function () {
      expect(await ldrToken.getTokenDistributionAddress()).to.equal(
        await tokenDistribution.getAddress()
      );
    });
  });
});
