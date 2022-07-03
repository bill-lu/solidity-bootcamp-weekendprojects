import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

async function queryBallotAndGetWinner(
    signer: ethers.Wallet, 
    ballotContractAddress: string) 
{

}
  
  export {queryBallotAndGetWinner};