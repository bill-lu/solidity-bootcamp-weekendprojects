import { ethers } from "ethers";
import "dotenv/config";

import * as tokenJson from "../artifacts/contracts/ERC20.sol/MyToken.json";
import * as nftJson from "../artifacts/contracts/ERC721.sol/MyNFT.json";

async function main() {
  const defaultProvider = ethers.getDefaultProvider("rinkeby");
  const signer = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    defaultProvider
  );

  const erc20ContractFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );
  const erc20Contract = await erc20ContractFactory.deploy();
  await erc20Contract.deployed();
  console.log("erc20 contract deployed at ", erc20Contract.address);

  const nftContractFactory = new ethers.ContractFactory(
    nftJson.abi,
    nftJson.bytecode,
    signer
  );
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("nft contract deployed at ", nftContract.address);
}

main();
