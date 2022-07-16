import * as shopJson from "../artifacts/contracts/Shop.sol/Shop.json";
import { ethers } from "ethers";
import "dotenv/config";

const purchaseRatio = 100;
const mintPrice = 10;

const tokenContract = "0x0eD4cB9c4Eb30d5D2449513E5c208DB85BB64F78";
const nftContract = "0x0520B5bDf6cf1AC79C6F678f33Ba5b76b49FFF79";

async function main() {
  const rinkebyProvider = ethers.getDefaultProvider("rinkeby");
  const signer = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    rinkebyProvider
  );
  const shopContractFactory = new ethers.ContractFactory(
    shopJson.abi,
    shopJson.bytecode,
    signer
  );
  const shopContract = await shopContractFactory.deploy(
    purchaseRatio,
    mintPrice,
    tokenContract,
    nftContract
  );
  await shopContract.deployed();

  console.log("address of shop contract is", shopContract.address);
}

main();
