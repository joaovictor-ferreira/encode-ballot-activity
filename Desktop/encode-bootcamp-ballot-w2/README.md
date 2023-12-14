# Ballot Smart Contract Project

This repository contains the code for the Ballot.sol smart contract, aimed at implementing a decentralized voting system on the Ethereum network. We've developed this project using Solidity and Hardhat.

## Table of Contents
- [Overview](#overview)
- [Scripts](#scripts)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Overview

This smart contract allows for casting, delegating, and querying votes on a series of proposals. It emphasizes transparent, secure, and decentralized decision-making.

## Scripts

We have developed several TypeScript scripts to interact with the Ballot contract:

1. **castingVotes.ts**: This script is used to cast votes for a particular proposal.
2. **delegateVoteVotes.ts**: Through this script, voters can delegateVote their votes to others.
3. **deployBallot.ts**: This script handles the deployment of the Ballot contract onto the Ethereum network.
4. **giveVotingRights.ts**: Administrators can use this script to grant voting rights to specific addresses.
5. **queryingResults.ts**: This script facilitates querying the results, allowing you to fetch the winning proposal's name.

These scripts are designed to be used with Hardhat, not Truffle, providing a more streamlined development experience.

## Installation

Follow these steps to set up the project:

```bash
git clone https://github.com/your-username/ballot.git
cd ballot
npm install
```

## Usage

To run any of the scripts, use the following command:

```bash
npx hardhat run scripts/<script-name>.ts
```
Replace `<script-name>` with the name of the script you want to execute.

**Deploy of the contract**

![image1](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/ff485ad9-4895-450a-b2e1-29846a0a8718)

![image2](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/a5e5fdd2-6c53-40fb-88fa-da05ce071746)

https://sepolia.etherscan.io/tx/0x6a93c7f376227825e336da8b73cefc9dee3518eb822714e759a2280f43984477

**Giving vote rights**

![image 3](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/42fa8e4e-57ba-48b7-82ec-46080b5ecaef)

![image 4](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/d7c0f8a3-7b3a-497f-b059-2d378299cc27)

https://sepolia.etherscan.io/tx/0x48aa64b493698775f1b10237ca574731c9db797cc598168189d103b8a0f03d48

**delegateVote votes**

![delegateVote](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/48752764-9498-49f6-8f68-aee1dee0bb59)

![delegateVote2](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/430c85f6-c458-4a24-8826-3959f7bfdf48)

https://sepolia.etherscan.io/tx/0x16411e4d3ad2ac45418f4381627db05642fdc0238d30b9381caf15eb0857d430

**Casting votes**

![casting](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/f1a6e3a0-7cc2-44db-83eb-070c520c8c3e)

![casting2](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/042d9d86-8ea5-4c25-8c5a-d8192a7baacb)

https://sepolia.etherscan.io/tx/0xee346a17051e8bc3a6c3dc85885d8ea678f3d1b71b2b3fe02d7e3feb6866a80f

**Querying**
![querying](https://github.com/ksavul/solidity-bootcamp-group2/assets/32058514/a4e89955-9f14-41c3-8ae5-80527b7e389a)


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute or raise any issues. Enjoy using the Ballot smart contract system!
