import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as voteTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../typechain";

async function mintAndDelegateToken(
    votingTokenAddress: string,
    ownerSigner: ethers.Wallet,
    mintAndDelegateToAddress: string,
    tokenAmount: number
  ) {
    /*
    const voteTokenContract: MyToken = new Contract(
      votingTokenAddress,
      voteTokenJson.abi,
      ownerSigner
    ) as MyToken;
*/
    return "";
  }
  
  export {mintAndDelegateToken};