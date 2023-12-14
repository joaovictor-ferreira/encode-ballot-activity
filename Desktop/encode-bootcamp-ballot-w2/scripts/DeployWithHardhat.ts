import { ethers } from "hardhat";

async function main() {
  const proposals = process.argv.slice(2);

  console.log("Deploying the Ballot");
  console.log("The Proposals are: ");
  proposals.forEach((element, index) => {
    console.log(`Team:  ${index + 1}: ${element}`);
  });

  const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String)
  );

  await ballotContract.waitForDeployment();

  const address = ballotContract.getAddress();

  console.log(`Ballot deployed at the current address: ${address}`);
  for (let i= 0; i < proposals.length; i++) {
    const proposal = await ballotContract.proposals(i);
    const name = ethers.decodeBytes32String(proposal.name);
    console.log({ i, name, proposal });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});