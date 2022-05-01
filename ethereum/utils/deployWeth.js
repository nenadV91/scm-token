const { ethers } = require("hardhat");

async function deployWeth() {
  const WethFactory = await ethers.getContractFactory("WETH9");
  const weth = await WethFactory.deploy();

  if (process.env.NODE_ENV !== "test") {
    console.log("Deployed WETH9 contract on address: ", weth.address);
  }

  return await weth.deployed();
}

module.exports = deployWeth;
