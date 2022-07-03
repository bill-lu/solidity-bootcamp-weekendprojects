import {getSinger, getAccountAddress} from "./accountsService";
import {deployTokenContract} from "./1_deployTokenContrac";
import {deployBallotContract} from "./2_deployBallotContract";
import {mintAndDelegateToken} from "./3_tokenOperation";
import {voteForBallot} from "./4_ballotOperate";
import {queryBallotAndGetWinner} from "./5_queryBallot";

import "dotenv/config";
import { ethers } from "ethers";
import { Address } from "cluster";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() 
{
  let proposals = ["Cake","Pizza","Soup","Beef"];
    const ownerSigner = await getSinger(
      process.env.PRIVATE_KEY_2,
      process.env.MNEMONIC,
      "rinkeby"
    );

    const secondSigner = await getSinger(
      process.env.PRIVATE_KEY_1,
      process.env.MNEMONIC,
      "rinkeby"
    );

    const tokenContractAddress = await deployTokenContract(ownerSigner);
    await mintAndDelegateToken(tokenContractAddress, ownerSigner, ownerSigner.address, 100);
    await mintAndDelegateToken(tokenContractAddress, ownerSigner, secondSigner.address, 100);
    
    const ballotConractAddress = await deployBallotContract(ownerSigner, tokenContractAddress, proposals);

    await voteForBallot(ownerSigner, ballotConractAddress, 1, 20);
    await voteForBallot(ownerSigner, ballotConractAddress, 2, 10);
    await voteForBallot(ownerSigner, ballotConractAddress, 0, 30);

    await voteForBallot(secondSigner, ballotConractAddress, 1, 20);
    await voteForBallot(secondSigner, ballotConractAddress, 2, 10);
    await voteForBallot(secondSigner, ballotConractAddress, 0, 30);

    await queryBallotAndGetWinner(ownerSigner, ballotConractAddress);

  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });