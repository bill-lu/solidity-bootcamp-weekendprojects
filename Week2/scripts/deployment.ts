import { ethers, Signer } from "ethers";
import "dotenv/config";
import * as mytokenJson from "../../artifacts/contracts/Token.sol/MyToken.json";
import * as ballotJson from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";


const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
const BASE_VOTE_POWER = 10;
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
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);

  const provider = ethers.providers.getDefaultProvider("ropsten");
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
  const TokenContract = await tokenContractFactory.deploy();
  console.log("Awaiting confirmations");
  await TokenContract.deployed();

  console.log("Completed");
  console.log(`MyToken Contract deployed at ${TokenContract.address}`);
  console.log("======Deploying Custom Ballot contract======");

  const mintTx = await TokenContract.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  ethers.utils.parseEther(BASE_VOTE_POWER.toFixed(18))
  );
  await mintTx.wait();

  console.log(`Account ${0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266} has ${await TokenContract.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")} tokens`);
  
  
  console.log("Delegating");
  const delegateTx = await TokenContract.connect("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266").delegate("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  await delegateTx.wait();

  const postDelegateVotePower = await TokenContract.getVotes("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  
  
  
  const ballotFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode, 
    signer
  );

  const BallotContract = await ballotFactory.deploy(convertStringArrayToBytes32(PROPOSALS),
  TokenContract.address);
  console.log("Awaiting confirmations");
  await BallotContract.deployed();

  console.log("Completed");
  console.log(`Custom Ballot Contract deployed at ${BallotContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
