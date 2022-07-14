import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { MyNFT, MyToken, Shop } from "../typechain";
// eslint-disable-next-line node/no-unpublished-import
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// eslint-disable-next-line node/no-unpublished-import
import { BigNumber } from "ethers";

const DEFAULT_PURCHASE_RATIO = 100;
const DEFAULT_MINT_PRICE = 0.3333333333333333;

describe("NFT Shop", async () => {
  let tokenContract: MyToken;
  let nftContract: MyNFT;
  let shopContract: Shop;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const [tokenContractFactory, nftContractFactory, shopContractFactory] =
      await Promise.all([
        ethers.getContractFactory("MyToken"),
        ethers.getContractFactory("MyNFT"),
        ethers.getContractFactory("Shop"),
      ]);
    tokenContract = await tokenContractFactory.deploy();
    await tokenContract.deployed();
    nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    shopContract = await shopContractFactory.deploy(
      DEFAULT_PURCHASE_RATIO,
      ethers.utils.parseEther(DEFAULT_MINT_PRICE.toFixed(18)),
      tokenContract.address,
      nftContract.address
    );
    await shopContract.deployed();
    const minterRole = await tokenContract.MINTER_ROLE();
    const minterRoleTx = await tokenContract.grantRole(
      minterRole,
      shopContract.address
    );
    await minterRoleTx.wait();
    const nftMinterRole = await nftContract.MINTER_ROLE();
    const nftMinterRoleTx = await nftContract.grantRole(
      nftMinterRole,
      shopContract.address
    );
    await nftMinterRoleTx.wait();
  });

  describe("When the Shop contract is deployed", async () => {
    it("defines the ratio as provided in parameters", async () => {
      const purchaseRatio = await shopContract.purchaseRatio();
      expect(purchaseRatio).to.eq(DEFAULT_PURCHASE_RATIO);
    });

    it("defines the mint price as provided in parameters", async () => {
      const mintPrice = await shopContract.mintPrice();
      expect(Number(ethers.utils.formatEther(mintPrice))).to.eq(
        Number(DEFAULT_MINT_PRICE.toFixed(18))
      );
    });

    it("uses a valid ERC20 as payment token", async () => {
      const tokenContractAddress = await shopContract.paymentToken();
      const tokenContractFactory = await ethers.getContractFactory("MyToken");
      const paymentTokenContract =
        tokenContractFactory.attach(tokenContractAddress);
      const [paymentTokenName, paymentTokenSymbol, paymentTokenSupply] =
        await Promise.all([
          paymentTokenContract.name(),
          paymentTokenContract.symbol(),
          paymentTokenContract.totalSupply(),
        ]);
      expect(paymentTokenName.length).to.greaterThan(0);
      expect(paymentTokenSymbol.length).to.greaterThan(0);
      expect(paymentTokenSupply.toNumber()).to.eq(0);
    });

    it("uses a valid ERC721 as NFT Collection", async () => {
      const nftontractAddress = await shopContract.paymentToken();
      const nftContractFactory = await ethers.getContractFactory("MyNFT");
      const nftCollectionContract =
        nftContractFactory.attach(nftontractAddress);
      const [nftCollectionName, nftCollectionSymbol] = await Promise.all([
        nftCollectionContract.name(),
        nftCollectionContract.symbol(),
      ]);
      expect(nftCollectionName.length).to.greaterThan(0);
      expect(nftCollectionSymbol.length).to.greaterThan(0);
    });
  });

  describe("When a user purchase an ERC20 from the Token contract", async () => {
    let accountValue: BigNumber;
    let txFee: BigNumber;
    let tokensEarned: BigNumber;
    const ETHER_SPEND = 500;

    beforeEach(async () => {
      accountValue = await accounts[0].getBalance();
      const purchaseTokenTx = await shopContract.purchaseTokens({
        value: ethers.utils.parseEther(ETHER_SPEND.toFixed(0)),
      });
      const purchaseTokenTxReceipt = await purchaseTokenTx.wait();
      const gasUsed = purchaseTokenTxReceipt.gasUsed;
      const effectiveGasPrice = purchaseTokenTxReceipt.effectiveGasPrice;
      txFee = gasUsed.mul(effectiveGasPrice);
      tokensEarned = await tokenContract.balanceOf(accounts[0].address);
    });

    it("charges the correct amount of ETH", async () => {
      const newAccountValue = await accounts[0].getBalance();
      const diff = accountValue.sub(newAccountValue);
      const expectedDiff = ethers.utils
        .parseEther(ETHER_SPEND.toFixed(0))
        .add(txFee);
      expect(expectedDiff.sub(diff)).to.eq("0");
    });

    it("gives the correct amount of tokens", async () => {
      expect(tokensEarned.toString()).to.eq(
        ethers.utils
          .parseEther((ETHER_SPEND / DEFAULT_PURCHASE_RATIO).toString())
          .toString()
      );
    });

    describe("When a user burns an ERC20 at the Token contract", async () => {
      let accountValueBurn: BigNumber;
      let txFeeBurn: BigNumber;
      let tokensLeft: BigNumber;
      const ETHER_SPEND = 500;

      beforeEach(async () => {
        accountValueBurn = await accounts[0].getBalance();
        const allowTokensTx = await tokenContract.increaseAllowance(
          shopContract.address,
          tokensEarned
        );
        const allowTokensReceipt = await allowTokensTx.wait();
        const gasUsed1 = allowTokensReceipt.gasUsed;
        const effectiveGasPrice1 = allowTokensReceipt.effectiveGasPrice;
        const txFee1 = gasUsed1.mul(effectiveGasPrice1);
        const returnTokensTx = await shopContract.returnTokens(tokensEarned);
        const returnTokensReceipt = await returnTokensTx.wait();
        const gasUsed2 = returnTokensReceipt.gasUsed;
        const effectiveGasPrice2 = returnTokensReceipt.effectiveGasPrice;
        const txFee2 = gasUsed2.mul(effectiveGasPrice2);
        txFeeBurn = txFee1.add(txFee2);
        tokensLeft = await tokenContract.balanceOf(accounts[0].address);
      });

      it("gives the correct amount of ETH", async () => {
        const newAccountValue = await accounts[0].getBalance();
        const diff = newAccountValue.sub(accountValueBurn);
        const expectedDiff = ethers.utils
          .parseEther(ETHER_SPEND.toFixed(0))
          .sub(txFeeBurn);
        expect(expectedDiff.sub(diff)).to.eq("0");
      });

      it("burns the correct amount of tokens", async () => {
        expect(tokensLeft.toString()).to.eq("0");
      });
    });

    describe("When a user purchase a NFT from the Shop contract", () => {
      let tokensBalanceBefore: BigNumber;
      let ownerPool: BigNumber;
      let publicPool: BigNumber;
      const NFT_ID = 1;
      beforeEach(async () => {
        tokensBalanceBefore = await tokenContract.balanceOf(
          accounts[0].address
        );
        const approveTokensTx = await tokenContract.approve(
          shopContract.address,
          ethers.constants.MaxUint256
        );
        await approveTokensTx.wait();
        const purchaseNftTx = await shopContract.purchaseNft(NFT_ID);
        await purchaseNftTx.wait();
        ownerPool = await shopContract.ownerPool();
        publicPool = await shopContract.publicPool();
      });

      it("charges the correct amount of ERC20 tokens", async () => {
        const newTokensBalance = await tokenContract.balanceOf(
          accounts[0].address
        );
        const diff = tokensBalanceBefore.sub(newTokensBalance);
        const expectedDiff = ethers.utils.parseEther(
          DEFAULT_MINT_PRICE.toFixed(18)
        );
        expect(diff.sub(expectedDiff).toNumber()).to.eq(0);
      });

      it("mints the correct NFT to the buyer", async () => {
        const [nftBalance, nftOwner, ntfUri] = await Promise.all([
          nftContract.balanceOf(accounts[0].address),
          nftContract.ownerOf(NFT_ID),
          nftContract.tokenURI(NFT_ID),
        ]);
        expect(nftBalance).to.eq(1);
        expect(nftOwner).to.eq(accounts[0].address);
        expect(ntfUri).to.eq("");
      });

      it("updates the owner account correctly", async () => {
        const expectedValue = ethers.utils
          .parseEther(DEFAULT_MINT_PRICE.toFixed(18))
          .div(2);
        const diff = ownerPool.sub(expectedValue);
        expect(diff.toString()).to.eq("0");
      });

      it("update the pool account correctly", async () => {
        const chargedValue = ethers.utils
          .parseEther(DEFAULT_MINT_PRICE.toFixed(18))
          .div(2);
        const expectedValue = ethers.utils
          .parseEther(DEFAULT_MINT_PRICE.toFixed(18))
          .sub(chargedValue);
        const diff = publicPool.sub(expectedValue);
        expect(diff.toString()).to.eq("0");
      });

      it("favors the pool with the rounding", async () => {
        const diff = publicPool.sub(ownerPool);
        expect(diff.toNumber()).to.gte(0);
      });

      describe("When a user burns their NFT at the Shop contract", async () => {
        let tokensBalanceBeforeBurn: BigNumber;
        const NFT_ID = 1;
        beforeEach(async () => {
          tokensBalanceBeforeBurn = await tokenContract.balanceOf(
            accounts[0].address
          );
          const approveNftTx = await nftContract.approve(
            shopContract.address,
            NFT_ID
          );
          await approveNftTx.wait();
          const returnNftTx = await shopContract.returnNft(NFT_ID);
          await returnNftTx.wait();
        });

        it("gives the correct amount of ERC20 tokens", async () => {
          const newTokensBalance = await tokenContract.balanceOf(
            accounts[0].address
          );
          const diff = newTokensBalance.sub(tokensBalanceBeforeBurn);
          const expectedDiff = ethers.utils
            .parseEther(DEFAULT_MINT_PRICE.toFixed(18))
            .div(2);
          expect(diff.sub(expectedDiff).toNumber()).to.eq(0);
        });

        it("updates the pool correctly", async () => {
          const publicPoolAfter = await shopContract.publicPool();
          const diff = publicPool.sub(publicPoolAfter);
          const expectedDiff = ethers.utils
            .parseEther(DEFAULT_MINT_PRICE.toFixed(18))
            .div(2);
          expect(diff.sub(expectedDiff).toNumber()).to.eq(0);
        });
      });

      describe("When the owner withdraw from the Shop contract", async () => {
        let tokensBalanceBeforeWithdraw: BigNumber;
        let withdrawValue: BigNumber;
        beforeEach(async () => {
          tokensBalanceBeforeWithdraw = await tokenContract.balanceOf(
            accounts[0].address
          );
          withdrawValue = ownerPool.div(10);
          const withdrawTx = await shopContract.ownerWithdraw(withdrawValue);
          await withdrawTx.wait();
        });

        it("recovers the right amount of ERC20 tokens", async () => {
          const newBalance = await tokenContract.balanceOf(accounts[0].address);
          const diff = newBalance.sub(tokensBalanceBeforeWithdraw);
          const expectedDiff = withdrawValue;
          expect(diff.sub(expectedDiff).toNumber()).to.eq(0);
        });

        it("updates the owner account correctly", async () => {
          const newOwnerPoolValue = await shopContract.ownerPool();
          const diff = ownerPool.sub(newOwnerPoolValue);
          const expectedDiff = withdrawValue;
          expect(diff.sub(expectedDiff).toNumber()).to.eq(0);
        });
      });
    });
  });

  describe("When the owner decreases the Mint price from the Shop contract", async () => {
    it("updates the pool and the owner account after increasing the price", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When the owner increases the Mint price from the Shop contract", async () => {});

  describe("When there is enough tokens in the pool to cover the costs", async () => {
    it("updates the pool and the owner account after increasing the price", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When there is not enough tokens in the pool to cover the costs", async () => {
    it("charges the correct amount and updates the pool and the owner account after decreasing the price", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When an attacker tries to exploit the contract", async () => {});

  describe("When transferring ownership", async () => {
    it("fails", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When withdrawing funds", async () => {
    it("fails ", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When changing the fee", async () => {
    it("fails", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When trying to burn a NFT without giving allowance to it", async () => {
    it("fails ", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When trying to buy ERC20 tokens without sufficient ETH balance", async () => {
    it("fails", async () => {
      throw new Error("Not implemented");
    });
  });
});
