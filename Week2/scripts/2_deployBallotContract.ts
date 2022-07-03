import { ethers, Wallet } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";

async function deployBallotContract( 
    signer: ethers.Wallet, 
    tokenConractAddress: string,
    proposals: string[])
{
    return "ballotConractAddress";
}

export {deployBallotContract};