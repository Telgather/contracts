require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    gasReporter: {
      enabled: true,
    },
  },

  networks: {
    arb_testnet: {
      url: process.env.API_KEY_URL_ARB_SEPOLIA,
      accounts: [process.env.TEST_PRIVATE_KEY],
      gasPrice: 150000000,
    },
    arb_oft: {
      url: process.env.API_KEY_URL_ARB_ONE,
      accounts: [process.env.OFT_PRIVATE_KEY],
      gasPrice: 120000000,
    },
  },
};
