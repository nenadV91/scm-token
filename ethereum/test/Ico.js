const { expect } = require("chai");
const { ethers } = require("hardhat");
const main = require("../utils/main");

describe("Ico contract", () => {
  let ico;
  let weth;
  let scm;
  let owner;
  let accounts;

  beforeEach(async () => {
    ({ ico, weth, scm, owner, accounts } = await main());
  });

  it("works", async () => {
    console.log("ico", ico.address);
  });
});
