import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";

describe("LDRToken", function () {
    let ldrToken: any;

    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;
    let addr3: Signer;

    beforeEach(async function () {
        // Récupère les signataires pour les tests
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        // Déploie le contrat
        ldrToken = await ethers.getContractFactory("LDRToken");
        ldrToken = await ldrToken.connect(owner).deploy();
    });

    describe("Deployment", function () {
        it("Should set the correct owner", async function () {
            expect(await ldrToken.owner()).to.equal(await owner.getAddress());
        });

        it("Should set the correct name and symbol", async function () {
            expect(await ldrToken.name()).to.equal("Ladoree Token");
            expect(await ldrToken.symbol()).to.equal("LDR");
        });
    });

    describe("Minting Tokens", function () {
        it("Should allow the owner to mint tokens to an address", async function () {
            const amountToMint = 50;
            const addr1Address = await addr1.getAddress();

            await ldrToken.mint(addr1Address, amountToMint);

            const balance = await ldrToken.balanceOf(addr1Address);
            expect(balance).to.equal(amountToMint);
        });

        it("Should adjust the amount to not exceed 200 tokens per address", async function () {
            const addr1Address = await addr1.getAddress();

            // Mint 150 tokens
            await ldrToken.mint(addr1Address, 150);

            // Attempt to mint 100 tokens, only 50 should be minted
            await ldrToken.mint(addr1Address, 100);

            const balance = await ldrToken.balanceOf(addr1Address);
            expect(balance).to.equal(200);
        });

        it("Should revert if the address already has 200 tokens", async function () {
            const addr1Address = (await addr1.getAddress()).toLowerCase();

            // Mint exactly 200 tokens
            await ldrToken.mint(addr1Address, 200);

            // Attempt to mint more should fail
            await expect(ldrToken.mint(addr1Address, 10)).to.be.revertedWith(
                `LDRToken: ${addr1Address} possede deja 200 tokens`
            );
        });

        it("Should revert if the amount to mint is zero", async function () {
            const addr1Address = await addr1.getAddress();

            await expect(ldrToken.mint(addr1Address, 0)).to.be.revertedWith(
                "LDRToken: Le montant a mint doit etre superieur a 0"
            );
        });
    });

    describe("Minting 10 Tokens for Caller", function () {
        it("Should mint 10 tokens for the caller", async function () {
            const addr1Address = await addr1.getAddress();

            await ldrToken.connect(addr1).mintTokens(10);

            const balance = await ldrToken.balanceOf(addr1Address);
            expect(balance).to.equal(10);
        });

        it("Should adjust the amount to not exceed 200 tokens for caller", async function () {
            const addr1Address = await addr1.getAddress();

            // Mint 195 tokens
            await ldrToken.mint(addr1Address, 195);

            // Attempt to mint 10 tokens, only 5 should be minted
            await ldrToken.connect(addr1).mintTokens(10);

            const balance = await ldrToken.balanceOf(addr1Address);
            expect(balance).to.equal(200);
        });

        it("Should revert if caller already has 200 tokens", async function () {
            const addr1Address = (await addr1.getAddress()).toLowerCase();

            // Mint exactly 200 tokens
            await ldrToken.mint(addr1Address, 200);

            // Attempt to mint more should fail
            await expect(ldrToken.connect(addr1).mintTokens(10)).to.be.revertedWith(
                `LDRToken: ${addr1Address} possede deja 200 tokens`

            );
        });
    });

    describe("Ownership", function () {
        it("Should revert if a non-owner tries to mint tokens to another address", async function () {
            const addr1Address = (await addr1.getAddress());

            try {
                // Tente de mint des tokens avec une adresse non autorisée
                await ldrToken.connect(addr1).mint(addr1Address, 10);
            } catch (error: any) {
                // Vérifie que le message d'erreur inclut "OwnableUnauthorizedAccount"
                expect(error.message).to.include("OwnableUnauthorizedAccount");
            }
        });
    });

    describe("Edge Cases", function () {
        it("Should handle multiple addresses independently", async function () {
            const addr1Address = await addr1.getAddress();
            const addr2Address = await addr2.getAddress();
            const addr3Address = await addr3.getAddress();

            // Mint tokens to multiple addresses
            await ldrToken.mint(addr1Address, 50);
            await ldrToken.mint(addr2Address, 150);
            await ldrToken.mint(addr3Address, 100);

            expect(await ldrToken.balanceOf(addr1Address)).to.equal(50);
            expect(await ldrToken.balanceOf(addr2Address)).to.equal(150);
            expect(await ldrToken.balanceOf(addr3Address)).to.equal(100);
        });

        it("Should not allow minting more than 200 tokens in total per address", async function () {
            const addr1Address = (await addr1.getAddress()).toLowerCase();

            // Mint 200 tokens in two steps
            await ldrToken.mint(addr1Address, 100);
            await ldrToken.mint(addr1Address, 100);

            // Attempt to mint more
            await expect(ldrToken.mint(addr1Address, 10)).to.be.revertedWith(
                `LDRToken: ${addr1Address} possede deja 200 tokens`
            );

            const balance = await ldrToken.balanceOf(addr1Address);
            expect(balance).to.equal(200);
        });
    });
});
