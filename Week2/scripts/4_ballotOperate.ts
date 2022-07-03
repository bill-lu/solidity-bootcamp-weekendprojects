
import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

async function voteForBallot(
    signer: ethers.Wallet, 
    ballotContractAddress: string,
    proposalVoteFor: number,
    votingPowerUsed: number) 
{
  /*
    const ballotContract: CustomBallot = new Contract(
      ballotContractAddress,
      ballotJson.abi,
      signer
    ) as CustomBallot;
  
    console.log("Voting Power before");
    const votingPower = await ballotContract.votingPower(signer.address);
    console.log(ethers.utils.formatEther(votingPower));
  
    const voteTx = await ballotContract.vote(proposalVoteFor, ethers.utils.parseEther(votingPowerUsed.toFixed(18)));
    console.log("Vote for proposal {proposalVoteFor} with {votingPowerUsed} Token", voteTx.hash);
  
    await voteTx.wait(1);
  
    console.log("Voting Power After");
    const votingPowerAfter = await ballotContract.votingPower(signer.address);
    console.log(ethers.utils.formatEther(votingPowerAfter));
    */
  }
  
  export {voteForBallot};