const hre = require("hardhat");

async function main() {
    console.log("Vérification des contrats sur Polygon Amoy...");

    // Vérifier UserManager
    await hre.run("verify:verify", {
        address: "0xeaeCB9909c85f6CA96EF09a325D36C736D4B8187", // Adresse du contrat UserManager
    });

    // Vérifier TokenDistribution
    await hre.run("verify:verify", {
        address: "0xe9C15FF93291F0D590E9DFC46Aac6b20C6C1b187", // Adresse du contrat TokenDistribution
    });

    // Vérifier LDRToken
    await hre.run("verify:verify", {
        address: "0xA3F902784618aee85114F86d5EB39ff2905fa158", // Adresse du contrat LDRToken
    });

    // Vérifier Marketplace
    await hre.run("verify:verify", {
        address: "0xcCB0c26038eD5B608f0eBf2Cdc2C0346b5f88Ab0", // Adresse du contrat Marketplace
    });

    // Vérifier AuthenticityNFT
    await hre.run("verify:verify", {
        address: "0x342DcDfB60D4310F6fcb8aF0e757B0B522A7946E", // Adresse du contrat AuthenticityNFT
    });

    console.log("Vérification terminée !");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
