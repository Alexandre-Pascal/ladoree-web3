const hre = require("hardhat");

async function main() {
    console.log("Déploiement du contrat sur Amoy...");

    // Récupérer le contrat à partir de l'ABI et de l'adresse
    const LDRToken = await hre.ethers.getContractFactory("LDRToken");

    // Déployer le contrat
    const ldrToken = await LDRToken.deploy();

    // Attendre que le contrat soit déployé
    await ldrToken.waitForDeployment();

    // Afficher l'adresse du contrat déployé
    console.log("LDRToken déployé à l'adresse :", await ldrToken.getAddress());

    // Set Contracts addresses in LDRToken
    await ldrToken.setUserManagerContract("0x468fBa9DaC4A48923C33783E3d0903925729Ac1E");
    await ldrToken.setTokenDistributionContract("0x366c8901bec9093b77F9B1A6493D18C52Fbc9719");
    console.log("LDRToken UserManager et TokenDistribution défini");
}

// Exécuter le script principal
main().catch((error) => {
    console.error("Erreur lors du déploiement :", error);
    process.exitCode = 1;
});