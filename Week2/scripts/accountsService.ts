import { ethers } from "ethers";
import "dotenv/config";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY = "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function setupProvider(network: string) {
  const infuraOptions = process.env.INFURA_API_KEY
    ? process.env.INFURA_API_SECRET
      ? {
          projectId: process.env.INFURA_API_KEY,
          projectSecret: process.env.INFURA_API_SECRET,
        }
      : process.env.INFURA_API_KEY
    : "";
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: infuraOptions,
  };
  const provider = ethers.providers.getDefaultProvider(network, options);
  return provider;
}

async function getSigner(
    privateKey: string | undefined,
    mnemonic: string | undefined,
    network: string = "rinkeby"
  ) {
    const wallet =
      mnemonic && mnemonic.length > 0
        ? ethers.Wallet.fromMnemonic(mnemonic)
        : new ethers.Wallet(privateKey ?? EXPOSED_KEY);
    console.log(`Using address ${wallet.address}`);
    const provider = setupProvider(network);
    const signer = wallet.connect(provider);
    return signer;
  }

  async function getAccountAddress(accountIndex: number)
  {
    let accountAddress = "";
    switch (accountIndex)
    {
        case 1: return process.env.ACCOUNT_1; break;
        case 2: return process.env.ACCOUNT_2; break;
        case 3: return process.env.ACCOUNT_3; break;
        case 4: return process.env.ACCOUNT_4; break;
        case 5: return process.env.ACCOUNT_5; break;
        default: break;
    }
  }

  export  {getSigner, getAccountAddress};


