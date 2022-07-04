# Weekend Project 2 - Report
## Scripts implemented
*  accountService.ts: get the wallet; setup provider ...
*  deployTokenContract.ts: the module deploys the token contract.
*  deployBallotContract.ts: the module deploys the custom ballot contract
*  mintAndDelegateToken.ts: mint tokens and delegate tokens
*  ballotOperate.ts: vote for proposals
*  queryBallotAndGetWinner.ts: get the winning proposal
*  operate.ts: perform the following actions by calling above modules
    * Deploy token contract
    * Mint tokens 
    * Delegate tokens
    * Deploy ballot contract
    * Vote for proposal
    * Getting the winning proposal

## Rinkeby Etherscan Link
https://rinkeby.etherscan.io/address/0x562B76419f03E3E8d296AF23700f2761F7538241
https://rinkeby.etherscan.io/address/0xAe387320b820b4886D32d3855ecC26c45C5E85f8

## Scripts run
```
AP-BillLu:Week2 billlu$ yarn ts-node --files ./scripts/operate.ts 
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/.bin/ts-node --files ./scripts/operate.ts
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Using address 0xB9F0bae584158f997cf31B5eC11fa2ceaaF32094
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Wallet balance 2.927909028086884
======Deploying MyToken contract======
Awaiting confirmations
MyToken Contract deployed at 0x562B76419f03E3E8d296AF23700f2761F7538241
minting tokens
minted 100 tokens to address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Mint transacton  0x104947145aee517e1854f3f789508c459d7259db847b9053488f698961750a59
delegating tokens to address 0xB9F0bae584158f997cf31B5eC11fa2ceaaF32094
delegated tokens from 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3 to 0xB9F0bae584158f997cf31B5eC11fa2ceaaF32094
Delegate transaction 0x063fac6f48b48c2a949ab1a6c4edff808c49bc2c1c7912379bf9594b826ee806
Wallet balance 2.9214367424098278
Proposals: 
Proposal N. 1: Cake
Proposal N. 2: Pizza
Proposal N. 3: Soup
Proposal N. 4: Beef
======Deploying Ballot contract======
Awaiting confirmations
Completed
Custom Ballot Contract deployed at 0xAe387320b820b4886D32d3855ecC26c45C5E85f8
Voting for proposal 1
Voted for proposal 1 with 20 Token 0x685a5d65ea5ff1f67634c49bf8421939b357261649de38a74d50b3b472e488af
getting winner name
Error: missing revert data in call exception; Transaction reverted without a reason string [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (code=CALL_EXCEPTION, version=providers/5.6.4)
    at Logger.makeError (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/logger/src.ts/index.ts:261:28)
    at Logger.throwError (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
    at /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/providers/src.ts/fallback-provider.ts:631:24
    at Array.forEach (<anonymous>)
    at /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/providers/src.ts/fallback-provider.ts:613:33
    at step (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/providers/lib/fallback-provider.js:48:23)
    at Object.next (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/providers/lib/fallback-provider.js:29:53)
    at step (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/providers/lib/fallback-provider.js:33:139)
    at Object.next (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/providers/lib/fallback-provider.js:29:53)
    at fulfilled (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/@ethersproject/providers/lib/fallback-provider.js:20:58) {
  reason: 'missing revert data in call exception; Transaction reverted without a reason string',
  code: 'CALL_EXCEPTION'
```
## Scripts re-run vote and getting winning proposal useing the ballot contract 0xAe387320b820b4886D32d3855ecC26c45C5E85f8:
```
AP-BillLu:Week2 billlu$ yarn ts-node --files ./scripts/operate.ts 
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week2/node_modules/.bin/ts-node --files ./scripts/operate.ts
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Using address 0xB9F0bae584158f997cf31B5eC11fa2ceaaF32094
Voting for proposal 1
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Voted for proposal 1 with 20 Token 0x1b85babbb6648b56f6bb3d2733501ae057792be2db69443aa81c3a55365a9aa2
getting winner name
winner is: Pizza
```
## Ropsten Etherscan Link
Ballot Contract: https://ropsten.etherscan.io/address/0xAD416A5892814D4Bd16686eFA76e13D4775A8E6C
Token Contract: https://ropsten.etherscan.io/address/0x77Dc4d3463fa5055F4C58de7e953030eDad1A6CA

## Scripts run on Ropsten Network
```
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 0.1865789170246567
======Deploying MyToken contract======
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Awaiting confirmations
MyToken Contract deployed at 0x77Dc4d3463fa5055F4C58de7e953030eDad1A6CA
minting tokens
minted 100 tokens to address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Mint transacton  0x3a07bc7b843074badce498418640ac4f76310707bfff517bb2363d7c3cc91dd1
delegating tokens to address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
delegated tokens from 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377 to 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Delegate transaction 0xc29419b1da652e2d0adcb56c615f039d54d67ace8a1bd8540ec03438c52ee9ed
Wallet balance 0.17980713249305505
Proposals: 
Proposal N. 1: Cake
Proposal N. 2: Pizza
Proposal N. 3: Soup
Proposal N. 4: Beef
======Deploying Ballot contract======
Awaiting confirmations
Completed
Custom Ballot Contract deployed at 0xAD416A5892814D4Bd16686eFA76e13D4775A8E6C
Voting for proposal 1
Voted for proposal 1 with 20 Token 0xf772e5e469ee15dc57d0f3e9394a4efc35ce640385cf618d5d830ab62f775e1f
getting winner name
winner is: Pizza
✨  Done in 86.05s.
```