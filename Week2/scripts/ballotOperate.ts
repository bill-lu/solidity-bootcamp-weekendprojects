
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
    console.log("Creating Ballot contract");
    const ballotContract: CustomBallot = new Contract(
      ballotContractAddress,
      ballotJson.abi,
      signer
    ) as CustomBallot;
    console.log("Ballot contract created");

    /*
    console.log(`Getting voting power for ${signer.address} before vote`);
    const votingPower = await ballotContract.votingPower(signer.address);
    console.log(` Voting power before: ${ethers.utils.formatEther(votingPower)}`);
    */

    console.log(`Voting for proposal ${proposalVoteFor}`);
    const voteTx = await ballotContract.vote(proposalVoteFor, ethers.utils.parseEther(votingPowerUsed.toFixed(18)));
    console.log(`Voted for proposal ${proposalVoteFor} with ${votingPowerUsed} Token`, voteTx.hash);
  
    await voteTx.wait(1);
  
    /*
    console.log("Getting voting power after vote");
    const votingPowerAfter = await ballotContract.votingPower(signer.address);
    console.log(`Voting power after: ${ethers.utils.formatEther(votingPowerAfter)}`);
    */
  }
  
  export {voteForBallot};