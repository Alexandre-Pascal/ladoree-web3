const hre = require("hardhat");

async function main() {
    console.log("Vérification des contrats sur Polygon Amoy...");

    // Vérifier UserManager
    await hre.run("verify:verify", {
        address: "0x8859F9fDCf1678da0D51D185F62c8443ff77fF76", // Adresse du contrat UserManager
    });

    // Vérifier TokenDistribution
    await hre.run("verify:verify", {
        address: "0x6a50f2634777938904B6718bF613c081e0F0F484", // Adresse du contrat TokenDistribution
    });

    // Vérifier LDRToken
    await hre.run("verify:verify", {
        address: "0xD442F656c41fbbd70eCC75E8CFd56bC84ea1b832", // Adresse du contrat LDRToken
        constructorArguments: [
            "0x8859F9fDCf1678da0D51D185F62c8443ff77fF76", // Adresse de UserManager
            "0x6a50f2634777938904B6718bF613c081e0F0F484", // Adresse de TokenDistribution
        ],
    });

    // Vérifier Marketplace
    await hre.run("verify:verify", {
        address: "0xf7480A948a708aaE6d125238A56e79e7F9201780", // Adresse du contrat Marketplace
    });

    // Vérifier AuthenticityNFT
    await hre.run("verify:verify", {
        address: "0x084f02553A49B6F8ECF608b8f988b0AEB0C76756", // Adresse du contrat AuthenticityNFT
    });

    console.log("Vérification terminée !");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
