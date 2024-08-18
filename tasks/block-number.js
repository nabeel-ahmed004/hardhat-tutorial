const { task } = require("hardhat/config");

task("block-number", "Displays the current block number").setAction(
  async (taskargs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current Block Number: ${blockNumber}`);
  }
);

module.exports = {};
