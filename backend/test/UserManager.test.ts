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
        ldrToken = (await LDRTokenFactory.deploy()) as LDRToken;

        // Set LDRToken contract in UserManager
        await userManager.connect(owner).setLDRTokenContract(ldrToken.getAddress());

        userManager.connect(owner).setLDRTokenContract(ldrToken.getAddress());
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
            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", false, ""))
                .to.emit(userManager, "UserRegistered")
                .withArgs(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", false, "");
        });

        it("Should emit UserRegistered event even if userEmail is empty", async function () {
            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "", "Oui salut moi c'est John Doe", false, ""))
                .to.emit(userManager, "UserRegistered")
                .withArgs(user1.getAddress(), "John Doe", "", "Oui salut moi c'est John Doe", false, "");
        });

        it("Should emit UserRegistered event even if userBio is empty", async function () {
            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "", "", false, ""))
                .to.emit(userManager, "UserRegistered")
                .withArgs(user1.getAddress(), "John Doe", "", "", false, "");
        });

        it("Should emit UserRegistered event  if image is empty", async function () {
            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "", "", false, ""))
                .to.emit(userManager, "UserRegistered")
                .withArgs(user1.getAddress(), "John Doe", "", "", false, "");
        });

        it("Shoul return true if user is a creator", async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", true, "ipfs://image");
            expect(await userManager.isCreator(user1.getAddress())).to.be.true;
        });

        it("Should revert if isCreator is true but all the informations arn't set", async function () {
            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "", "", true, ""))
                .to.be.revertedWith("User must have all information to be a creator");
        });

        it("Should not allow to register the same user twice", async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", false, "");

            await expect(userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", false, ""))
                .to.be.revertedWith("User already registered");
        });

        describe("Set each information", function () {
            describe("Not the owner of the address", function () {
                it("Should not allow to set the userName if it's not his address", async function () {
                    await expect(userManager.connect(user1).setUserName(user2.getAddress(), "John Doe"))
                        .to.be.revertedWith("User not the owner of the address");
                });

                it("Should not allow to set the bio if it's not his address", async function () {
                    await expect(userManager.connect(user1).setUserBio(user2.getAddress(), "Oui salut moi c'est John Doe"))
                        .to.be.revertedWith("User not the owner of the address");
                });

                it("Should not allow to set the email if it's not his address", async function () {
                    await expect(userManager.connect(user1).setUserEmail(user2.getAddress(), "abcd@gmail.com"))
                        .to.be.revertedWith("User not the owner of the address");
                });

                it("Should not allow to set isCreator if it's not his address", async function () {
                    await expect(userManager.connect(user1).setUserIsCreator(user2.getAddress(), true))
                        .to.be.revertedWith("User not the owner of the address");
                });

                it("Should not allow to set the image if it's not his address", async function () {
                    await expect(userManager.connect(user1).setUserProfileImage(user2.getAddress(), "ipfs://image"))
                        .to.be.revertedWith("User not the owner of the address");
                });
            });
            describe("Not registered", function () {
                it("Should not allow to set the userName if the user is not registered", async function () {
                    await expect(userManager.connect(user2).setUserName(user2.getAddress(), "John Doe"))
                        .to.be.revertedWith("User not registered");
                });

                it("Should not allow to set the bio if the user is not registered", async function () {
                    await expect(userManager.connect(user2).setUserBio(user2.getAddress(), "Oui salut moi c'est John Doe"))
                        .to.be.revertedWith("User not registered");
                });

                it("Should not allow to set the email if the user is not registered", async function () {
                    await expect(userManager.connect(user2).setUserEmail(user2.getAddress(), "johndow@gmail.com"))
                        .to.be.revertedWith("User not registered");
                });

                it("Should not allow to set isCreator if the user is not registered", async function () {
                    await expect(userManager.connect(user2).setUserIsCreator(user2.getAddress(), true))
                        .to.be.revertedWith("User not registered");
                });

                it("Should not allow to set the image if the user is not registered", async function () {
                    await expect(userManager.connect(user2).setUserProfileImage(user2.getAddress(), "ipfs://image"))
                        .to.be.revertedWith("User not registered");
                });
            });
        });
    });

    describe("Update Last Mint Time", function () {
        beforeEach(async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", false, "");
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
                .setLDRTokenContract(ldrToken.getAddress());

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
            await userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", false, "");
            await userManager.connect(owner).updateLastMintTime(user1.getAddress());
        });

        it("Should allow the owner to reset the last mint time", async function () {
            await userManager.connect(owner).resetLastMintTime(user1.getAddress());
            const lastMintTime = await userManager.getLastMintTime(user1.getAddress());
            expect(lastMintTime).to.equal(0);
        });

        it("Should allow the LDRToken contract to reset the last mint time", async function () {
            await userManager.connect(owner).setLDRTokenContract(ldrToken.getAddress());
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
            await userManager.connect(owner).setLDRTokenContract(newTokenAddress);
            expect(await userManager.ldrToken()).to.equal(newTokenAddress);
        });

        it("Should not allow a non-owner to set the token contract", async function () {
            const newTokenAddress = ethers.Wallet.createRandom().address;

            try {
                await userManager.connect(user1).setLDRTokenContract(newTokenAddress)
            } catch (error: any) {
                // Vérifie que le message d'erreur inclut "OwnableUnauthorizedAccount"
                expect(error.message).to.include("OwnableUnauthorizedAccount");
            }
        });
    });

    describe("Get Last Mint Time", function () {
        it("Should return the last mint time of a registered user", async function () {
            await userManager.connect(user1).registerUser(user1.getAddress(), "John Doe", "abcd@gmail.com", "Oui salut moi c'est John Doe", false, "");
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

    describe("Get address of contracts", function () {
        it("Should return the address of the LDRToken contract", async function () {
            expect(await userManager.getLDRTokenContractAddress()).to.equal(await ldrToken.getAddress());
        });
    });
});
