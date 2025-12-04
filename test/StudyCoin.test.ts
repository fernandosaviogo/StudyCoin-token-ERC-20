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
      expect(symbol).to.equal("SDC");
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

    it("Should get balance", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balance = await studyCoin.balanceOf(owner.address);
      expect(balance).to.equal(1000n * 10n ** 18n);
    });
    
    it("Should transfer", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await studyCoin.balanceOf(owner.address);
      const balanceOtherBefore = await studyCoin.balanceOf(otherAccount.address);

      await studyCoin.transfer(otherAccount.address, 1n);

      const balanceOwnerAfter = await studyCoin.balanceOf(owner.address);
      const balanceOtherAfter = await studyCoin.balanceOf(otherAccount.address);
      
      expect(balanceOwnerBefore).to.equal(1000n * 10n ** 18n);
      expect(balanceOtherBefore).to.equal(0);
      expect(balanceOwnerAfter).to.equal((1000n * 10n ** 18n) - 1n);
      expect(balanceOtherAfter).to.equal(1n);
    });

    it("Should NOT transfer", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      
      const instance = studyCoin.connect(otherAccount);
      await expect(instance.transfer(owner.address, 1n)).to.be.revertedWith("Insufficient balance");
    });

    it("Should approve", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);

      await studyCoin.approve(otherAccount.address, 1n);

      const value = await studyCoin.allowance(owner.address, otherAccount.address);
      expect(value).to.equal(1n);
    });

    it("Should transfer from", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await studyCoin.balanceOf(owner.address);
      const balanceOtherBefore = await studyCoin.balanceOf(otherAccount.address);

      await studyCoin.approve(otherAccount.address, 10n);

      const instance = studyCoin.connect(otherAccount);
      await instance.transferFrom(owner.address, otherAccount.address, 5n);

      const balanceOwnerAfter = await studyCoin.balanceOf(owner.address);
      const balanceOtherAfter = await studyCoin.balanceOf(otherAccount.address);
      const allowance = await studyCoin.allowance(owner.address, otherAccount.address);
      
      expect(balanceOwnerBefore).to.equal(1000n * 10n ** 18n);
      expect(balanceOtherBefore).to.equal(0);
      expect(balanceOwnerAfter).to.equal((1000n * 10n ** 18n) - 5n);
      expect(balanceOtherAfter).to.equal(5n);
      expect(allowance).to.equal(5n);
    });

    it("Should NOT transfer from (Insufficient balance)", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      
      const instance = studyCoin.connect(otherAccount);
      await expect(instance.transferFrom(otherAccount.address, otherAccount.address, 1n))
        .to.be.revertedWith("Insufficient balance");
    });

    it("Should NOT transfer from (allowance)", async function () {
      const { studyCoin, owner, otherAccount } = await loadFixture(deployFixture);
      
      const instance = studyCoin.connect(otherAccount);
      await expect(instance.transferFrom(owner.address, otherAccount.address, 1n))
        .to.be.revertedWith("Insufficient allowance");
    });
});
