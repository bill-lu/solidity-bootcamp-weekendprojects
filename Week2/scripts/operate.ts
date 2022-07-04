import {getSigner, getAccountAddress} from "./accountsService";
import "dotenv/config";
import { ethers } from "ethers";

import {deployTokenContract} from "./deployTokenContract";
import {deployBallotContract} from "./deployBallotContract";
import {mintAndDelegateToken} from "./mintAndDelegateToken";
import {voteForBallot} from "./ballotOperate";
//import {queryBallotAndGetWinner} from "./5_queryBallot";

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

    const tokenContractAddress = await deployTokenContract(
      ownerSigner
    );
    // const tokenContractAddress = "0x7fc54EE184D50871f55E65f0000d471a2c25676D"
    await mintAndDelegateToken(
      tokenContractAddress, 
      ownerSigner, 
      secondSigner.address, 
      100
    );
    
    const ballotConractAddress = await deployBallotContract(
      ownerSigner, 
      tokenContractAddress, 
      proposals
    );
    
    
    //const ballotConractAddress = "0x1cf06F6eA98e48A08a4ccC2C3Dd02A08212a6F17";
    await voteForBallot(
      secondSigner, 
      ballotConractAddress, 
      1, 
      20
    );

    await voteForBallot(
      secondSigner, 
      ballotConractAddress, 
      2, 
      10
    );

    await voteForBallot(
      secondSigner, 
      ballotConractAddress, 
      0, 
      30
    );

    //await queryBallotAndGetWinner(ownerSigner, ballotConractAddress);

  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });