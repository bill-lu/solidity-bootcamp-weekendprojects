import { ethers, Signer } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function deployBallotContract(
  signerWallet: ethers.Wallet,
  tokenConractAddress: string,
  proposals: string[]
) {
  const provider = ethers.providers.getDefaultProvider("rinkeby");
  const signer = signerWallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  console.log("Proposals: ");
  if (proposals.length < 2) throw new Error("Not enough proposals provided");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  console.log("======Deploying Ballot contract======");

  const ballotFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode,
    signer
  );

  const ballotContract = (await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals),
    tokenConractAddress
  )) as CustomBallot;

  console.log("Awaiting confirmations");
  await ballotContract.deployed();

  console.log("Completed");
  console.log(`Custom Ballot Contract deployed at ${ballotContract.address}`);

  return ballotContract.address;
}

export { deployBallotContract };
