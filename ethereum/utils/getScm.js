const { ethers } = require("hardhat");

async function getScm(ico) {
  const scmAddress = await ico.scm();

  if (process.env.NODE_ENV !== "test") {
    console.log("Deployed SCM contract on address: ", scmAddress);
  }

  const scmFactory = await ethers.getContractFactory("Scam");
  return scmFactory.attach(scmAddress);
}

module.exports = getScm;
