const hre = require("hardhat");

async function main() {
    console.log("Déploiement du contrat sur Amoy...");

    // Récupérer le contrat à partir de l'ABI et de l'adresse
    const UserManager = await hre.ethers.getContractFactory("UserManager");

    // Déployer le contrat
    const userManager = await UserManager.deploy();

    // Attendre que le contrat soit déployé
    await userManager.waitForDeployment();

    // Afficher l'adresse du contrat déployé
    console.log("UserManager déployé à l'adresse :", await userManager.getAddress());
}

// Exécuter le script principal
main().catch((error) => {
    console.error("Erreur lors du déploiement :", error);
    process.exitCode = 1;
});
