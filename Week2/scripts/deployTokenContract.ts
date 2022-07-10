import { ethers, Signer, Wallet } from "ethers";
import "dotenv/config";
import * as mytokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken, CustomBallot } from "../typechain";

async function deployTokenContract(signerWallet: Wallet) {
  const provider = ethers.providers.getDefaultProvider("rinkeby");
  const signer = signerWallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log("======Deploying MyToken contract======");

  const tokenContractFactory = new ethers.ContractFactory(
    mytokenJson.abi,
    mytokenJson.bytecode,
    signer
  );
  const tokenContract = (await tokenContractFactory.deploy()) as MyToken;
  console.log("Awaiting confirmations");
  await tokenContract.deployed();

  console.log(`MyToken Contract deployed at ${tokenContract.address}`);

  return tokenContract.address;
}

export { deployTokenContract };
