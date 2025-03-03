require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");
import "@nomicfoundation/hardhat-chai-matchers";

require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
