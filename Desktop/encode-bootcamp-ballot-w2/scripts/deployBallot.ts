import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { Ballot, Ballot__factory } from "../typechain-types";
dotenv.config();

async function main() {
  const PROPOSALS = ["Flamengo's proposal", "Corinthians' proposal", "Palmeiras' proposal "];

  console.log("Deploying contract in Sepolia...");

  const [wallet] = await ethers.getSigners();
  console.log("Deploying with address: ", wallet.address);

  const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    PROPOSALS.map(ethers.encodeBytes32String)
  );
  await ballotContract.waitForDeployment();
  const address = await ballotContract.getAddress();

  await ballotContract.waitForDeployment();
  console.log("Ballot Contract deployed at the current Address: ", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
