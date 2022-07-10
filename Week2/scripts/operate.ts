import {getSigner, getAccountAddress} from "./accountsService";
import "dotenv/config";
import { ethers } from "ethers";

import {deployTokenContract} from "./deployTokenContract";
import {deployBallotContract} from "./deployBallotContract";
import {mintAndDelegateToken} from "./mintAndDelegateToken";
import {voteForBallot} from "./ballotOperate";
import {queryBallotAndGetWinner} from "./queryBallotAndGetWinner";

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
    const ownerSigner = await getSigner(
      process.env.PRIVATE_KEY_2,
      process.env.MNEMONIC,
      "rinkeby"
    );

    const secondSigner = await getSigner(
      process.env.PRIVATE_KEY_1,
      process.env.MNEMONIC,
      "rinkeby"
    );

    ///*
    const tokenContractAddress = await deployTokenContract(
      ownerSigner
    );
    // const tokenContractAddress = "0x6534Da8220ABC587C334D8440Ce135200AB9108d"
    await mintAndDelegateToken(
      tokenContractAddress, 
      ownerSigner, 
      secondSigner.address, 
      100
    );
    
    const ballotContractAddress = await deployBallotContract(
      ownerSigner, 
      tokenContractAddress, 
      proposals
    );
    
    //*/
    //const ballotContractAddress = "0x6534Da8220ABC587C334D8440Ce135200AB9108d";
    await voteForBallot(
      secondSigner, 
      ballotContractAddress, 
      1, 
      20
    );

    /*
    await voteForBallot(
      secondSigner, 
      ballotContractAddress, 
      2, 
      10
    );

    await voteForBallot(
      secondSigner, 
      ballotContractAddress, 
      0, 
      30
    );
    */

    await queryBallotAndGetWinner(
      ownerSigner, 
      ballotContractAddress
    );

  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });