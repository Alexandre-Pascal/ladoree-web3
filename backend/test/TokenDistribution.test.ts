import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenDistribution, LDRToken, UserManager, Marketplace } from "../typechain-types";
import { Signer } from "ethers";

describe("TokenDistribution", function () {
  let tokenDistribution: TokenDistribution;
  let ldrToken: LDRToken;
  let userManager: UserManager;
  let marketplace: Marketplace;
  let owner: Signer;
  let user1: Signer;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    // Deploy LDRToken mock
    const LDRTokenFactory = await ethers.getContractFactory("LDRToken");
    ldrToken = (await LDRTokenFactory.deploy()) as LDRToken;

    // Deploy UserManager mock
    const UserManagerFactory = await ethers.getContractFactory("UserManager");
    userManager = (await UserManagerFactory.deploy()) as UserManager;

    // Deploy TokenDistribution contract
    const TokenDistributionFactory = await ethers.getContractFactory(
      "TokenDistribution"
    );
    tokenDistribution =
      (await TokenDistributionFactory.deploy()) as TokenDistribution;

    // Deploy Marketplace
    const MarketplaceFactory = await ethers.getContractFactory("Marketplace");
    marketplace = (await MarketplaceFactory.deploy()) as Marketplace;

    // Initialize LDRToken and UserManager in TokenDistribution
    await tokenDistribution.setLDRToken(ldrToken.getAddress());
    await tokenDistribution.setUserManager(userManager.getAddress());
    await tokenDistribution.setMarketplace(marketplace.getAddress());
  });

  describe("Deployment", function () {
    it("Should initialize the contract with correct parameters", async function () {
      // Initialize LDRToken and UserManager in TokenDistribution
      await tokenDistribution.setLDRToken(ldrToken.getAddress());
      await tokenDistribution.setUserManager(userManager.getAddress());
    });

    it("Should revert if its not the owner who tries to initialize the LDRToken", async function () {
      try {
        await tokenDistribution
          .connect(user1)
          .setLDRToken(ldrToken.getAddress());
      } catch (error: any) {
        // Vérifie que le message d'erreur inclut "OwnableUnauthorizedAccount"
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });

    it("Should revert if its not the owner who tries to initialize the UserManager", async function () {
      try {
        await tokenDistribution
          .connect(user1)
          .setUserManager(userManager.getAddress());
      } catch (error: any) {
        // Vérifie que le message d'erreur inclut "OwnableUnauthorizedAccount"
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });
  });

  describe("Calculate Tokens", function () {
    it("Should calculate tokens correctly for a given amount spent", async function () {
      const amountSpent = 100;

      // Use the same scaling factor as Solidity's fixed-point arithmetic
      const DECIMALS = 1e18;
      const MAX_TOKENS = 200 * DECIMALS; // Scale up the constants
      const DECAY_PARAMETER = 200 * DECIMALS;

      // Scale the input as well
      const scaledAmountSpent = amountSpent * DECIMALS;

      // Perform the calculation
      const tokens = await tokenDistribution.calculateTokens(amountSpent);

      // Expected tokens calculation: (MAX_TOKENS * amountSpent) / (DECAY_PARAMETER + amountSpent)
      const expectedTokens =
        (MAX_TOKENS * scaledAmountSpent) /
        (DECAY_PARAMETER + scaledAmountSpent);

      // Scale the expected tokens back down to match Solidity output
      const normalizedTokens = Math.floor(expectedTokens / DECIMALS);

      expect(tokens).to.equal(normalizedTokens);
    });

    it("Should return a maximum lower than 200 tokens if the amount is really hight", async function () {
      const largeAmountSpent = 100000; // Large value to hit cap
      const tokens = await tokenDistribution.calculateTokens(largeAmountSpent);

      expect(tokens).to.be.below(200);
    });

    it("Should revert if the amount spent is zero", async function () {
      await expect(tokenDistribution.calculateTokens(0)).to.be.revertedWith(
        "Amount spent must be greater than 0"
      );
    });

    it("Should modify the quantity of tokens if its superior to 200", async function () {
      const amountSpent = 1000;
      const tokens = await tokenDistribution.calculateTokens(amountSpent);

      expect(tokens).to.be.below(200);
    });
  });

  describe("Distribute Tokens", async function () {
    // Initialize LDRToken and UserManager in TokenDistribution
    await tokenDistribution.setLDRToken(ldrToken.getAddress());
    await tokenDistribution.setUserManager(userManager.getAddress());

    it("Should only allow the NFT contract to call distributeTokens", async function () {
      const amountSpent = 50;

      await expect(
        tokenDistribution.distributeTokens(user1.getAddress(), amountSpent)
      ).to.be.revertedWith(
        "TokenDistribution: Caller is not the Marketplace contract"
      );
    });
  });

  describe("Get address of contracts", function () {
    it("Should return the address of the LDRToken contract", async function () {
      expect(await tokenDistribution.getLDRTokenAddress()).to.equal(
        await ldrToken.getAddress()
      );
    });

    it("Should return the address of the UserManager contract", async function () {
      expect(await tokenDistribution.getUserManagerAddress()).to.equal(
        await userManager.getAddress()
      );
    });

    it("Should return the address of the TokenDistribution contract", async function () {
      expect(await tokenDistribution.getMarketplaceAddress()).to.equal(
        await marketplace.getAddress()
      );
    });

  });
});
