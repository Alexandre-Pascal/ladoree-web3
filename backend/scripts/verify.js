const hre = require("hardhat");

async function main() {
    console.log("Vérification des contrats sur Polygon Amoy...");

    // Vérifier UserManager
    await hre.run("verify:verify", {
        address: "0x468fBa9DaC4A48923C33783E3d0903925729Ac1E", // Adresse du contrat UserManager
    });

    // Vérifier TokenDistribution
    await hre.run("verify:verify", {
        address: "0x366c8901bec9093b77F9B1A6493D18C52Fbc9719", // Adresse du contrat TokenDistribution
    });

    // Vérifier LDRToken
    await hre.run("verify:verify", {
        address: "0x89B9Cb8D0EDfE3681fA01B217D73592F2C05cc85", // Adresse du contrat LDRToken
    });

    // Vérifier Marketplace
    await hre.run("verify:verify", {
        address: "0x440A2eBAD487ECF8158F76B9F72dAF5B2a6Ef858", // Adresse du contrat Marketplace
    });

    // Vérifier AuthenticityNFT
    await hre.run("verify:verify", {
        address: "0x45B782Fb1B1363c92CEC532D312e6F42039AB9C1", // Adresse du contrat AuthenticityNFT
    });

    console.log("Vérification terminée !");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
