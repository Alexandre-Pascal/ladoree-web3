const hre = require("hardhat");

async function main() {
    console.log("Déploiement du contrat sur Amoy...");

    // Récupérer le contrat à partir de l'ABI et de l'adresse
    const AuthenticityNFT = await hre.ethers.getContractFactory("AuthenticityNFT");

    // Déployer le contrat
    const authenticityNFT = await AuthenticityNFT.deploy();

    // Attendre que le contrat soit déployé
    await authenticityNFT.waitForDeployment();

    // Afficher l'adresse du contrat déployé
    console.log("AuthenticityNFT déployé à l'adresse :", await authenticityNFT.getAddress());
}

// Exécuter le script principal
main().catch((error) => {
    console.error("Erreur lors du déploiement :", error);
    process.exitCode = 1;
});