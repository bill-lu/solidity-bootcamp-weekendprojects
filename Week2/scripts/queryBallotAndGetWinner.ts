import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../typechain";

async function queryBallotAndGetWinner(
  signer: ethers.Wallet,
  ballotContractAddress: string
) {
  const ballotContract = (await new Contract(
    ballotContractAddress,
    ballotJson.abi,
    signer
  )) as CustomBallot;

  console.log(`getting winner name`);
  const winnerName = await ballotContract.winnerName();
  console.log(`winner is: ${ethers.utils.parseBytes32String(winnerName)}`);
}

export { queryBallotAndGetWinner };
