const hre = require("hardhat");

async function main() {
    console.log("Vérification des contrats sur Polygon Amoy...");

    // Vérifier UserManager
    await hre.run("verify:verify", {
        address: "0x569fAaE374232F280B2AaaF434a15E9b7DE5Acf5", // Adresse du contrat UserManager
    });

    // Vérifier TokenDistribution
    await hre.run("verify:verify", {
        address: "0x8D0b0d855EeCA6f137A799F7326fd35E423bCe47", // Adresse du contrat TokenDistribution
    });

    // Vérifier LDRToken
    await hre.run("verify:verify", {
        address: "0x9AC1c3b6Cff352332485DCc50139e92AD2628d68", // Adresse du contrat LDRToken
    });

    // Vérifier Marketplace
    await hre.run("verify:verify", {
        address: "0x5D6b16F39840f26e1c5A3828BD0C64f17BB82907", // Adresse du contrat Marketplace
    });

    // Vérifier AuthenticityNFT
    await hre.run("verify:verify", {
        address: "0x7020c5d58fA9fB9A92efaB2cd447A00E3EBF1E33", // Adresse du contrat AuthenticityNFT
    });

    console.log("Vérification terminée !");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
