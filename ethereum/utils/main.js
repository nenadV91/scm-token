const deployIco = require("../utils/deployIco");
const deployWeth = require("../utils/deployWeth");
const getScm = require("../utils/getScm");
const { ethers } = require("hardhat");

async function main() {
  const [owner, ...accounts] = await ethers.getSigners();

  if (process.env.NODE_ENV !== "test") {
    console.log("Deploying contracts with the account:", owner.address);
  }

  const weth = await deployWeth();
  const ico = await deployIco(weth);
  const scm = await getScm(ico);

  return { weth, ico, scm, owner, accounts };
}

module.exports = main;
