const hre = require("hardhat");

async function main() {
    // Déployer UserManager
    const UserManager = await hre.ethers.getContractFactory("UserManager");
    const userManager = await UserManager.deploy();
    await userManager.deployed();
    console.log("UserManager déployé à :", userManager.address);

    // Déployer TokenDistribution
    const TokenDistribution = await hre.ethers.getContractFactory("TokenDistribution");
    const tokenDistribution = await TokenDistribution.deploy();
    await tokenDistribution.deployed();
    console.log("TokenDistribution déployé à :", tokenDistribution.address);

    // Déployer LDRToken avec des arguments
    const LDRToken = await hre.ethers.getContractFactory("LDRToken");
    const ldrToken = await LDRToken.deploy();
    await ldrToken.deployed();
    console.log("LDRToken déployé à :", ldrToken.address);

    // Déployer Marketplace
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();
    console.log("Marketplace déployé à :", marketplace.address);

    // Déployer AuthenticityNFT
    const AuthenticityNFT = await hre.ethers.getContractFactory("AuthenticityNFT");
    const authenticityNFT = await AuthenticityNFT.deploy();
    await authenticityNFT.deployed();
    console.log("AuthenticityNFT déployé à :", authenticityNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
