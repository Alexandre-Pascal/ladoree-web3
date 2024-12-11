const hre = require("hardhat");

async function main() {
    // Déployer UserManager
    const UserManager = await hre.ethers.getContractFactory("UserManager");
    const userManager = await UserManager.deploy();
    await userManager.waitForDeployment();
    console.log("UserManager déployé à :", await userManager.getAddress());

    // Déployer TokenDistribution
    const TokenDistribution = await hre.ethers.getContractFactory("TokenDistribution");
    const tokenDistribution = await TokenDistribution.deploy();
    await tokenDistribution.waitForDeployment();
    console.log("TokenDistribution déployé à :", await tokenDistribution.getAddress());

    // Déployer LDRToken avec des arguments
    const LDRToken = await hre.ethers.getContractFactory("LDRToken");
    const ldrToken = await LDRToken.deploy();
    await ldrToken.waitForDeployment();
    console.log("LDRToken déployé à :", await ldrToken.getAddress());

    // Déployer Marketplace
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.waitForDeployment();
    console.log("Marketplace déployé à :", await marketplace.getAddress());

    // Déployer AuthenticityNFT
    const AuthenticityNFT = await hre.ethers.getContractFactory("AuthenticityNFT");
    const authenticityNFT = await AuthenticityNFT.deploy();
    await authenticityNFT.waitForDeployment();
    console.log("AuthenticityNFT déployé à :", await authenticityNFT.getAddress());

    // Set Contracts addresses in AuthenticityNFT

    // Set Contracts addresses in LDRToken
    await ldrToken.setUserManagerContract(await userManager.getAddress());
    await ldrToken.setTokenDistributionContract(await tokenDistribution.getAddress());
    console.log("LDRToken UserManager et TokenDistribution défini");

    // Set Contracts addresses in UserManager
    await userManager.setLDRTokenContract(await ldrToken.getAddress());
    console.log("UserManager LDRToken défini");

    // Set Contracts addresses in TokenDistribution
    await tokenDistribution.setLDRTokenContract(await ldrToken.getAddress());
    await tokenDistribution.setUserManagerContract(await userManager.getAddress());
    await tokenDistribution.setMarketplaceContract(await marketplace.getAddress());
    console.log("TokenDistribution LDRToken, UserManager et Marketplace défini");

    // Set Contracts addresses in Marketplace
    await marketplace.setTokenDistributionContract(await tokenDistribution.getAddress());
    await marketplace.setAuthenticityNFTContract(await authenticityNFT.getAddress());
    console.log("Marketplace TokenDistribution et AuthenticityNFT défini");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
