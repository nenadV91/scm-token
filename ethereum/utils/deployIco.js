const { ethers } = require("hardhat");

async function deployIco(weth) {
  const IcoFactory = await ethers.getContractFactory("Ico");
  const ico = await IcoFactory.deploy(weth.address);

  if (process.env.NODE_ENV !== "test") {
    console.log("Deployed ICO contract on address: ", ico.address);
  }

  return await ico.deployed();
}

module.exports = deployIco;
