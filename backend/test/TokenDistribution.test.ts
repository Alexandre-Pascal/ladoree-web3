// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { Signer } from "ethers";

// describe("TokenDistribution", function () {
//     let tokenDistribution: any;

//     let owner: Signer;
//     let addr1: Signer;
//     let addr2: Signer;

//     beforeEach(async function () {
//         [owner, addr1, addr2] = await ethers.getSigners();

//         // Déploie le contrat TokenDistribution
//         const TokenDistribution = await ethers.getContractFactory("TokenDistribution");
//         tokenDistribution = await TokenDistribution.connect(owner).deploy();
//     });

//     describe("calculateTokens", function () {
//         it("Should calculate tokens correctly for small amounts", async function () {
//             const amountSpent = 50;
//             const expectedTokens = (200 * amountSpent) / (200 + amountSpent);

//             const tokens = await tokenDistribution.calculateTokens(amountSpent);
//             expect(tokens).to.equal(expectedTokens);
//         });

//         it("Should cap tokens at MAX_TOKENS for large amounts", async function () {
//             const amountSpent = 1_000_000; // Large amount
//             const tokens = await tokenDistribution.calculateTokens(amountSpent);

//             expect(tokens).to.equal(200); // MAX_TOKENS
//         });

//         it("Should revert if amountSpent is 0", async function () {
//             await expect(tokenDistribution.calculateTokens(0)).to.be.revertedWith(
//                 "Amount spent must be greater than 0"
//             );
//         });
//     });

//     describe("distributeTokens", function () {
//         it("Should distribute tokens correctly and emit TokensDistributed", async function () {
//             const amountSpent = 100;
//             const addr1Address = await addr1.getAddress();
//             const expectedTokens = (200 * amountSpent) / (200 + amountSpent);

//             await expect(tokenDistribution.connect(owner).distributeTokens(addr1Address, amountSpent))
//                 .to.emit(tokenDistribution, "TokensDistributed")
//                 .withArgs(addr1Address, amountSpent, expectedTokens);

//             const balance = await tokenDistribution.balanceOf(addr1Address);
//             expect(balance).to.equal(expectedTokens);
//         });

//         it("Should cap tokens at MAX_TOKENS for large spending and emit TokensDistributed", async function () {
//             const amountSpent = 1_000_000; // Large amount
//             const addr1Address = await addr1.getAddress();

//             await expect(tokenDistribution.connect(owner).distributeTokens(addr1Address, amountSpent))
//                 .to.emit(tokenDistribution, "TokensDistributed")
//                 .withArgs(addr1Address, amountSpent, 200);

//             const balance = await tokenDistribution.balanceOf(addr1Address);
//             expect(balance).to.equal(200); // MAX_TOKENS
//         });

//         it("Should revert if distributeTokens is called with zero amountSpent", async function () {
//             const addr1Address = await addr1.getAddress();

//             await expect(
//                 tokenDistribution.connect(owner).distributeTokens(addr1Address, 0)
//             ).to.be.revertedWith("Amount spent must be greater than 0");
//         });

//         it("Should revert if distributeTokens is called with zero address", async function () {
//             await expect(
//                 tokenDistribution.connect(owner).distributeTokens(ethers.ZeroAddress, 100)
//             ).to.be.revertedWith("Invalid user address");
//         });

//         it("Should distribute tokens to multiple users correctly", async function () {
//             const addr1Address = await addr1.getAddress();
//             const addr2Address = await addr2.getAddress();

//             // Distribute to addr1
//             await tokenDistribution.connect(owner).distributeTokens(addr1Address, 100);
//             const balance1 = await tokenDistribution.balanceOf(addr1Address);
//             expect(balance1).to.equal((200 * 100) / (200 + 100));

//             // Distribute to addr2
//             await tokenDistribution.connect(owner).distributeTokens(addr2Address, 50);
//             const balance2 = await tokenDistribution.balanceOf(addr2Address);
//             expect(balance2).to.equal((200 * 50) / (200 + 50));
//         });

//         it("Should adjust distribution if the user's balance would exceed MAX_TOKENS", async function () {
//             const addr1Address = await addr1.getAddress();

//             // Mint 150 tokens to addr1
//             await tokenDistribution.connect(owner).distributeTokens(addr1Address, 600); // ~150 tokens

//             // Distribute more tokens
//             const amountSpent = 100;
//             const expectedTokens = Math.min(200 - 150, (200 * amountSpent) / (200 + amountSpent));

//             await expect(tokenDistribution.connect(owner).distributeTokens(addr1Address, amountSpent))
//                 .to.emit(tokenDistribution, "TokensDistributed")
//                 .withArgs(addr1Address, amountSpent, expectedTokens);

//             const balance = await tokenDistribution.balanceOf(addr1Address);
//             expect(balance).to.equal(200); // MAX_TOKENS
//         });
//     });
// });
