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
) {
  const tokenContract = new Contract(
    votingTokenAddress,
    TokenArtifact.abi,
    ownerSigner
  ) as MyToken;
  console.log(`minting tokens`);
  let tx = await tokenContract.mint(mintAndDelegateToAddress, tokenAmount);
  await tx.wait();
  console.log(`minted ${tokenAmount} tokens`);
  console.log(`delegating tokens`);
  tx = await tokenContract.delegate(mintAndDelegateToAddress);
  console.log(`delegated tokens`);
}

export { mintAndDelegateToken };