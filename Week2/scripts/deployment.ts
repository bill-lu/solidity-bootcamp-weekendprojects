import { ethers, Signer } from "ethers";
import "dotenv/config";
import * as mytokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import {MyToken, CustomBallot} from "../typechain";


const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY_1 ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);

  const provider = ethers.providers.getDefaultProvider("rinkeby");
  const signer = wallet.connect(provider);
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
  const TokenContract = (await tokenContractFactory.deploy()) as MyToken ;
  console.log("Awaiting confirmations");
  await TokenContract.deployed();

  let tokenAmt = 100

  console.log("Mintng");
  const minTx = await TokenContract.mint(signer.address, ethers.utils.parseEther(tokenAmt.toFixed(18)));
  await minTx.wait();

  console.log("Delegating");
  const delegateTx = await TokenContract.delegate(signer.address);
  await delegateTx.wait();

  console.log("Completed");
  console.log(`MyToken Contract deployed at ${TokenContract.address}`);
  console.log("======Deploying Custom Ballot contract======");

  const ballotFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode, 
    signer
  );

  const BallotContract = (await ballotFactory.deploy(convertStringArrayToBytes32(PROPOSALS),
  TokenContract.address)) as CustomBallot;
  console.log("Awaiting confirmations");
  await BallotContract.deployed();

  console.log("Completed");
  console.log(`Custom Ballot Contract deployed at ${BallotContract.address}`);

  console.log("Voting");
  const voteTx = await BallotContract.vote(1, ethers.utils.parseEther(tokenAmt.toFixed(18)));
  console.log(`Vote to first proposal with ${tokenAmt} Token, tx hash: ${voteTx.hash}`);

  await voteTx.wait(1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
