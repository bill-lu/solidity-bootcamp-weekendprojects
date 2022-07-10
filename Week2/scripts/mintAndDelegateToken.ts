import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as TokenArtifact from "../artifacts/contracts/Token.sol/MyToken.json";

// eslint-disable-next-line node/no-missing-import
import { MyToken } from "../typechain";

async function mintAndDelegateToken(
  votingTokenAddress: string,
  ownerSigner: ethers.Wallet,
  delegateToAddress: string,
  tokenAmount: number
) 
{
  const tokenContract: MyToken = new Contract(
    votingTokenAddress,
    TokenArtifact.abi,
    ownerSigner
  ) as MyToken;

  console.log(`minting tokens`);
  let tx = await tokenContract.mint(
    ownerSigner.address,
    ethers.utils.parseEther(tokenAmount.toFixed(18))
  );
  await tx.wait(1);

  console.log(`minted ${tokenAmount} tokens to address ${ownerSigner.address}`);
  console.log("Mint transacton ", tx.hash);

  console.log(`delegating tokens to address ${delegateToAddress}`);
  tx = await tokenContract.delegate(
    delegateToAddress
  );
  await tx.wait(1);
  
  console.log(`delegated tokens from ${ownerSigner.address} to ${delegateToAddress}`);
  console.log("Delegate transaction", tx.hash);
}

export { mintAndDelegateToken };
