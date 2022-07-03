import {getSinger, getAccountAddress} from "./accountsService";
import "dotenv/config";

async function main() {
    const ownerSigner = await getSinger(
      process.env.PRIVATE_KEY,
      process.env.MNEMONIC,
      "rinkeby"
    );

    const account1 = await getAccountAddress(1);
    console.log(`Using testing address ${account1}`);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });