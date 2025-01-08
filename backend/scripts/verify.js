const hre = require("hardhat");

async function main() {
    console.log("Vérification des contrats sur Polygon Amoy...");

    // Vérifier UserManager
    await hre.run("verify:verify", {
        address: "0x432BD61aa62AAAF2C063F54b4cD29Cc739bb0A6d", // Adresse du contrat UserManager
    });

    // Vérifier TokenDistribution
    await hre.run("verify:verify", {
        address: "0x0B5A42c90bBd1Dc6A10276C4C3361D1f259967Fd", // Adresse du contrat TokenDistribution
    });

    // Vérifier LDRToken
    await hre.run("verify:verify", {
        address: "0xef8fb5FC45b6a1e67b50B94EFEA6659FCCF31B66", // Adresse du contrat LDRToken
    });

    // Vérifier Marketplace
    await hre.run("verify:verify", {
        address: "0x7FfF7d4b2Cd376E40fce166930D8D79d6d2Eaa03", // Adresse du contrat Marketplace
    });

    // Vérifier AuthenticityNFT
    await hre.run("verify:verify", {
        address: "0x39378CD92578c0F210Fa3Ba3629b7AE823fdf7B4", // Adresse du contrat AuthenticityNFT
    });

    console.log("Vérification terminée !");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
