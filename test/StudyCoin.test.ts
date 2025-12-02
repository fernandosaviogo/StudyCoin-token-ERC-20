import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("StudyCoin", function () {
  
  async function deployFixture(){
    const [owner, otherAccount] = await ethers.getSigners();

    const StudyCoin = await ethers.getContractFactory("StudyCoin");
    const studyCoin = await StudyCoin.deploy();

    return { studyCoin, owner, otherAccount };
  }

  it("Should have correct name", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const name = await studyCoin.name();
      expect(name).to.equal("StudyCoin");
    });

    it("Should have correct symbol", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const symbol = await studyCoin.symbol();
      expect(symbol).to.equal("SRC");
    });

    it("Should have correct decimals", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const decimals = await studyCoin.decimals();
      expect(decimals).to.equal(18);
    });

    it("Should have correct totalSuplay", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const totalSuplay = await studyCoin.totalSuplay();
      expect(totalSuplay).to.equal(1000n * 10n ** 18n);
    });
});
