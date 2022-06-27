# Weekend Project 1 - Report
## Scripts run
*  1. Deployment the contract
*  2. Query the proposals
*  3. Query voting result (before anyone votes)
*  4. Cast a vote before given vote right
*  5. Delete to a voter without vote right
*  6. Give vote right
*  7. Delegate to a voter with vote right
*  8. Cast a vote 
*  9. Cast a vote second time
* 10. Delete to another voter after voted for proposal
* 11. Quering voting result
* 12. Query the proposals

## Rinkeby Etherscan Link
https://rinkeby.etherscan.io/address/0x9be7ea381d0759dfb295b7922f0e32fce121104f

## Scripts run
### 1. Deployment the contract
```
AP-BillLu:Week1 billlu$ yarn hardhat compile
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/hardhat compile
Nothing to compile
No need to generate any newer typings.
✨  Done in 4.18s.
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/1_deployment.ts Solana Ethereum Algorand Polygon Bitcoin
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/1_deployment.ts Solana Ethereum Algorand Polygon Bitcoin
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Wallet balance 3.390425666444232
Deploying Ballot contract
Proposals: 
Proposal N. 1: Solana
Proposal N. 2: Ethereum
Proposal N. 3: Algorand
Proposal N. 4: Polygon
Proposal N. 5: Bitcoin
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
Completed
Contract deployed at 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
✨  Done in 23.01s.
AP-BillLu:Week1 billlu$ 
```
### 2. Query the proposals
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/2_queryProposals.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/2_queryProposals.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Wallet balance 3.38847535443383
Query proposals ... 
Proposal 1  -- name: Solana, voteCount: 0
Proposal 2  -- name: Ethereum, voteCount: 0
Proposal 3  -- name: Algorand, voteCount: 0
Proposal 4  -- name: Polygon, voteCount: 0
Proposal 5  -- name: Bitcoin, voteCount: 0
✨  Done in 5.15s.
AP-BillLu:Week1 billlu$ 

```
### 3. Query voting result (before anyone votes)
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/6_queryVotingResult.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/6_queryVotingResult.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Wallet balance 3.38847535443383
Query voting result ... 
Check result before anyone votes
✨  Done in 3.29s.
AP-BillLu:Week1 billlu$ 

```
### 4. Cast a vote before given vote right
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/4_vote.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 1
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/4_vote.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 1
Using address 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Wallet balance 0.5
Attaching ballot contract interface to address 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Error: Voter's voting weight must be greater than 0
    at main (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/scripts/Ballot/4_vote.ts:41:11)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
AP-BillLu:Week1 billlu$ 

```
### 5. Delete to a voter without vote right
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/5_delegateVotingRights.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/5_delegateVotingRights.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Wallet balance 2.388443854433662
Attaching ballot contract interface to address 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Error: DelegateTo user doesn't have right to vote
    at main (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/scripts/Ballot/5_delegateVotingRights.ts:44:11)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
AP-BillLu:Week1 billlu$ 

```
### 6. Give vote right
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/3_giveVotingRights.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/3_giveVotingRights.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Wallet balance 2.388443854433662
Attaching ballot contract interface to address 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Giving right to vote to 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Awaiting confirmations
Transaction completed. Hash: 0x6583f6be455bc12fda7889343f496be65f1496102ed09c7600d52f1cc021b830
✨  Done in 23.27s.
AP-BillLu:Week1 billlu$ 

```
### 7. Delegate to a voter with vote right
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/5_delegateVotingRights.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/5_delegateVotingRights.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Using address 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Wallet balance 2.3883708689332726
Attaching ballot contract interface to address 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
Delegate vote to 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
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
Transaction completed. Hash: 0x958a876e3eb96f45469061755b4d792e1a248582b7431eb59a9aed093b47237c
✨  Done in 16.96s.
AP-BillLu:Week1 billlu$ 

```
### 8. Cast a vote
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/4_vote.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 1
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/4_vote.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 1
Using address 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Wallet balance 0.5
Attaching ballot contract interface to address 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Voting on proposal 1
Awaiting confirmations
Transaction completed. Hash: 0x8b0349c59a695a4dd807ccbfa98f7cef8dbe07c05e1cf42de61bfe46a7d7f3cc
✨  Done in 395.38s.

```
### 9. Cast a vote second time
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/4_vote.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 1
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/4_vote.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 1
Using address 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Wallet balance 0.49986061399925663
Attaching ballot contract interface to address 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
Error: Voter has already voted
    at main (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/scripts/Ballot/4_vote.ts:44:11)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
AP-BillLu:Week1 billlu$ 

```
### 10. Delete to another voter after voted for proposal
```
P-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/5_delegateVotingRights.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/5_delegateVotingRights.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F 0xB37a6e80c1acE46bEfe6CCA3A00E16655C14a6d3
Using address 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Wallet balance 0.49986061399925663
Attaching ballot contract interface to address 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
Error: Caller already voted
    at main (/Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/scripts/Ballot/5_delegateVotingRights.ts:40:11)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
AP-BillLu:Week1 billlu$ 

```
### 11. Quering voting result
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/6_queryVotingResult.ts   0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/6_queryVotingResult.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
Using address 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Wallet balance 0.49986061399925663
Query voting result ... 
Winning proposal: Ethereum
✨  Done in 3.20s.
AP-BillLu:Week1 billlu$ 

```
### 12. Query the proposals
```
AP-BillLu:Week1 billlu$ yarn ts-node ./scripts/Ballot/2_queryProposals.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
yarn run v1.22.15
warning ../../../../../package.json: No license field
$ /Users/billlu/Projects/Blockchains/solidity-bootcamp/solidity-bootcamp-weekendprojects/Week1/node_modules/.bin/ts-node ./scripts/Ballot/2_queryProposals.ts 0x9be7ea381d0759Dfb295b7922f0e32Fce121104F
Using address 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
Wallet balance 0.49986061399925663
Query proposals ... 
Proposal 1  -- name: Solana, voteCount: 0
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Proposal 2  -- name: Ethereum, voteCount: 2
Proposal 3  -- name: Algorand, voteCount: 0
Proposal 4  -- name: Polygon, voteCount: 0
Proposal 5  -- name: Bitcoin, voteCount: 0
✨  Done in 7.32s.
AP-BillLu:Week1 billlu$

```