const { expect } = require("chai");
const { ethers } = require("hardhat");
const main = require("../utils/main");

const eth = (ether) => ethers.utils.parseEther(String(ether));
const ICO_LIMIT = "100";
const ICO_MULTIPLIER = 10;
const ICO_CLAIM_DELAY = 3000;

const withDelay = (fn, delay) => {
  const space = " ".repeat(8);
  const dl = delay / 1000;
  console.log(`${space}running function with delay of ${dl}s`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = fn();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }, delay);
  });
};

describe("Ico contract", () => {
  let ico;
  let weth;
  let scm;
  let owner;
  let accounts;
  let addr1;
  let addr2;
  let addWeth;

  beforeEach(async () => {
    ({ ico, weth, scm, owner, accounts } = await main());
    addr1 = accounts[0];
    addr2 = accounts[1];

    addWeth = async (account, amount) => {
      await weth.magicallyCreate(account.address, eth(amount));
      await weth.connect(account).approve(ico.address, eth(amount));
    };
  });

  describe("deployment", () => {
    it("sets the correct weth limit", async () => {
      expect(await ico.wethLimit()).to.equal(eth(ICO_LIMIT));
    });

    it("sets the correct initial invested weth amount", async () => {
      expect(await ico.wethLimit()).to.equal(eth(ICO_LIMIT));
    });
  });

  describe("invest method", () => {
    it("requires that the invest status is open", async () => {
      await addWeth(addr1, 200);
      await ico.connect(addr1).invest(eth(150));

      await expect(ico.connect(addr2).invest(eth(10))).to.be.revertedWith(
        "investment phase is closed"
      );
    });

    it("requires sufficient WETH allowance", async () => {
      await expect(ico.invest(eth(1))).to.be.revertedWith(
        "insufficient WETH allowance"
      );

      await addWeth(addr1, 5);
      await ico.connect(addr1).invest(eth(1));

      expect(await ico.wethInvested()).to.equal(eth(1));
    });

    it("sets correct invested amount", async () => {
      await addWeth(addr1, 10);
      await ico.connect(addr1).invest(eth(5));

      expect(await ico.wethInvested()).to.equal(eth(5));

      await addWeth(addr2, 25);
      await ico.connect(addr2).invest(eth(25));

      expect(await ico.wethInvested()).to.equal(eth(30));
    });

    it("sets correct claimamble and remaining amounts", async () => {
      const amountOne = 50;
      await addWeth(addr1, amountOne);
      await ico.connect(addr1).invest(eth(amountOne));

      expect(await ico.remaining()).to.equal(eth(ICO_LIMIT - amountOne));
      expect(await ico.claimableAmount(addr1.address)).to.equal(
        eth(amountOne * ICO_MULTIPLIER)
      );

      const amountTwo = 25;
      await addWeth(addr1, amountTwo);
      await ico.connect(addr1).invest(eth(amountTwo));

      expect(await ico.remaining()).to.equal(
        eth(ICO_LIMIT - amountOne - amountTwo)
      );
      expect(await ico.claimableAmount(addr1.address)).to.equal(
        eth((amountOne + amountTwo) * ICO_MULTIPLIER)
      );
    });

    it("limits the maximum invested amout if it goes over the ICO limit", async () => {
      const amount = 150;
      await addWeth(addr1, amount);
      await ico.connect(addr1).invest(eth(amount));

      expect(await ico.wethInvested()).to.equal(eth(ICO_LIMIT));
      expect(await ico.remaining()).to.equal(eth(0));
      expect(await weth.balanceOf(addr1.address)).to.equal(
        eth(amount - ICO_LIMIT)
      );
    });
  });

  describe("claim method", () => {
    it("requires that investment status is closed", async () => {
      await expect(ico.connect(addr1).claim()).to.be.revertedWith(
        "investment phase is still open"
      );
    });

    it("requires that claiming phase is open", async () => {
      await addWeth(addr1, ICO_LIMIT);
      await ico.connect(addr1).invest(eth(ICO_LIMIT));

      await expect(ico.connect(addr1).claim()).to.be.revertedWith(
        "claiming phase is not yet open"
      );
    });

    it("requires that user has claimable amount", async function () {
      const amount1 = 75;
      await addWeth(addr1, amount1);
      await ico.connect(addr1).invest(eth(amount1));

      const amount2 = 25;
      await addWeth(addr2, amount2);
      await ico.connect(addr2).invest(eth(amount2));

      await withDelay(async () => {
        await ico.connect(addr2).claim();
        await ico.connect(addr1).claim();

        expect(await scm.balanceOf(addr1.address)).to.equal(
          eth(amount1 * ICO_MULTIPLIER)
        );
        expect(await scm.balanceOf(addr2.address)).to.equal(
          eth(amount2 * ICO_MULTIPLIER)
        );
      }, ICO_CLAIM_DELAY);
    });
  });
});
