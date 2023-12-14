import { ethers } from "ethers";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const proposals = process.argv.slice(2);
  console.log("Deploying the Ballot");
  console.log( "The Proposals are: ");
  proposals.forEach((element, index) => {
    console.log(`Team:  ${index + 1}: ${element}`);
  });

  const provider = ethers.getDefaultProvider("sepolia");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }



  const ballotFactory =await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String)
  );
  await ballotContract.waitForDeployment();

  const address = ballotContract.getAddress();

  //   Logging the proposals
  console.log(`Ballot deployed at the current address: ${address}`);
  for (let i= 0; i< proposals.length; i++) {
    const proposal = await ballotContract.proposals(i);
    const name = ethers.decodeBytes32String(proposal.name);
    console.log({ i, name, proposal });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
