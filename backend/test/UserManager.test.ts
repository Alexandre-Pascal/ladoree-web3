import { expect } from "chai";
import { ethers } from "hardhat";
import { UserManager, LDRToken } from "../typechain-types";
import { Signer } from "ethers";

describe("UserManager", function () {
    let userManager: UserManager;
    let ldrToken: LDRToken;
    let owner: Signer;
    let user1: Signer;
    let user2: Signer;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy UserManager contract
        const UserManagerFactory = await ethers.getContractFactory("UserManager");
        userManager = (await UserManagerFactory.deploy()) as UserManager;

        // Deploy LDRToken mock
        const LDRTokenFactory = await ethers.getContractFactory("LDRToken");
        ldrToken = (await LDRTokenFactory.deploy(
            userManager.getAddress(),
            ethers.ZeroAddress
        )) as LDRToken;

        // Set LDRToken contract in UserManager
        await userManager.connect(owner).setTokenContract(ldrToken.getAddress());
    });

    describe("Deployment", function () {
        it("Should deploy with the correct owner", async function () {
            expect(await userManager.owner()).to.equal(await owner.getAddress());
        });

        it("Should initialize without any registered users", async function () {
            const isRegistered = await userManager.isUserRegistered(user1.getAddress());
            expect(isRegistered).to.be.false;
        });
    });

    describe("Register User", function () {
        it("Should emit UserRegistered event when a new user is registered", async function () {
            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe"))
                .to.emit(userManager, "UserRegistered")
                .withArgs(user1.getAddress(), "abcd@gmail.com", "John", "Doe");
        });

        it("Should not allow to register the same user twice", async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");

            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe"))
                .to.be.revertedWith("User already registered");
        });

        describe("Set each information", function () {
            it("Should not allow to set the lastname if it's not his address", async function () {
                await expect(userManager.connect(user1).setUserLastName(user2.getAddress(), "Doe"))
                    .to.be.revertedWith("User not the owner of the address");
            });

            it("Should not allow to set the firstname if it's not his address", async function () {
                await expect(userManager.connect(user1).setUserFirstName(user2.getAddress(), "John"))
                    .to.be.revertedWith("User not the owner of the address");
            });

            it("Should not allow to set the email if it's not his address", async function () {
                await expect(userManager.connect(user1).setUserEmail(user2.getAddress(), "abcd@gmail.com"))
                    .to.be.revertedWith("User not the owner of the address");
            });
        });
    });

    describe("Update Last Mint Time", function () {
        beforeEach(async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");
        });

        it("Should allow the owner to update the last mint time of a user", async function () {
            await userManager.connect(owner).updateLastMintTime(user1.getAddress());
            const lastMintTime = await userManager.getLastMintTime(user1.getAddress());
            expect(lastMintTime).to.be.gt(0);
        });

        it("Should allow the LDRToken contract to update the last mint time", async function () {
            // await userManager.connect(owner).registerUser(user2.getAddress());
            await userManager
                .connect(owner)
                .setTokenContract(ldrToken.getAddress());

            await userManager.connect(owner).updateLastMintTime(user1.getAddress());
            const lastMintTime = await userManager.getLastMintTime(user1.getAddress());
            expect(lastMintTime).to.be.gt(0);
        });

        it("Should revert if a non-owner or non-token contract tries to update the last mint time", async function () {
            await expect(
                userManager.connect(user2).updateLastMintTime(user1.getAddress())
            ).to.be.revertedWith("UserManager: Caller is not the owner or the token contract");
        });

        it("Should revert if a user is not registered", async function () {
            await expect(
                userManager.connect(owner).updateLastMintTime(user2.getAddress())
            ).to.be.revertedWith("User not registered");
        });
    });

    describe("Reset Last Mint Time", function () {
        beforeEach(async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");
            await userManager.connect(owner).updateLastMintTime(user1.getAddress());
        });

        it("Should allow the owner to reset the last mint time", async function () {
            await userManager.connect(owner).resetLastMintTime(user1.getAddress());
            const lastMintTime = await userManager.getLastMintTime(user1.getAddress());
            expect(lastMintTime).to.equal(0);
        });

        it("Should allow the LDRToken contract to reset the last mint time", async function () {
            await userManager.connect(owner).setTokenContract(ldrToken.getAddress());
            await userManager.connect(owner).resetLastMintTime(user1.getAddress());;

            const lastMintTime = await userManager.getLastMintTime(user1.getAddress());
            expect(lastMintTime).to.equal(0);
        });

        it("Should revert if a non-owner or non-token contract tries to reset the last mint time", async function () {
            await expect(
                userManager.connect(user2).resetLastMintTime(user1.getAddress())
            ).to.be.revertedWith("UserManager: Caller is not the owner or the token contract");
        });

        it("Should revert if a user is not registered", async function () {
            await expect(
                userManager.connect(owner).resetLastMintTime(user2.getAddress())
            ).to.be.revertedWith("User not registered");
        });
    });

    describe("Set Token Contract", function () {
        it("Should allow the owner to set the token contract", async function () {
            const newTokenAddress = ethers.Wallet.createRandom().address;
            await userManager.connect(owner).setTokenContract(newTokenAddress);
            expect(await userManager.ldrToken()).to.equal(newTokenAddress);
        });

        it("Should not allow a non-owner to set the token contract", async function () {
            const newTokenAddress = ethers.Wallet.createRandom().address;

            try {
                await userManager.connect(user1).setTokenContract(newTokenAddress)
            } catch (error: any) {
                // Vérifie que le message d'erreur inclut "OwnableUnauthorizedAccount"
                expect(error.message).to.include("OwnableUnauthorizedAccount");
            }
        });
    });

    describe("Get Last Mint Time", function () {
        it("Should return the last mint time of a registered user", async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "abcd@gmail.com", "John", "Doe");
            await userManager.connect(owner).updateLastMintTime(user1.getAddress());

            const lastMintTime = await userManager.getLastMintTime(user1.getAddress());
            expect(lastMintTime).to.be.gt(0);
        });

        it("Should revert if a user is not registered", async function () {
            await expect(
                userManager.connect(owner).getLastMintTime(user2.getAddress())
            ).to.be.revertedWith("User not registered");
        });
    });


});
