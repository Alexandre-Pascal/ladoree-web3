const hre = require("hardhat");

async function main() {
    console.log("Déploiement du contrat sur Amoy...");

    // Récupérer le contrat à partir de l'ABI et de l'adresse
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");

    // Déployer le contrat
    const marketplace = await Marketplace.deploy();

    // Attendre que le contrat soit déployé
    await marketplace.waitForDeployment();

    // Afficher l'adresse du contrat déployé
    console.log("Marketplace déployé à l'adresse :", await marketplace.getAddress());
}

// Exécuter le script principal
main().catch((error) => {
    console.error("Erreur lors du déploiement :", error);
    process.exitCode = 1;
});