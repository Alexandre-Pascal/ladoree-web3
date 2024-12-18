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
}

// Exécuter le script principal
main().catch((error) => {
    console.error("Erreur lors du déploiement :", error);
    process.exitCode = 1;
});