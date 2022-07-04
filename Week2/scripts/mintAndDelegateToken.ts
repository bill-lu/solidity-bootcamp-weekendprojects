import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as TokenArtifact from "../artifacts/contracts/Token.sol/MyToken.json";

// eslint-disable-next-line node/no-missing-import
import { MyToken } from "../typechain";

async function mintAndDelegateToken(
  votingTokenAddress: string,
  ownerSigner: ethers.Wallet,
  mintAndDelegateToAddress: string,
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

  console.log(`minted ${tokenAmount} tokens`);
  console.log("Mint transacton", tx.hash);

  console.log(`delegating tokens`);
  tx = await tokenContract.delegate(
    mintAndDelegateToAddress
  );
  await tx.wait(1);
  
  console.log(`delegated tokens`);
  console.log("Delegate transaction", tx.hash);
}

export { mintAndDelegateToken };
