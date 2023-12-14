import { EtherscanProvider, ethers } from "ethers";
import * as dotenv from "dotenv";
import { Ballot, Ballot__factory } from "../typechain-types";
import { Wallet } from "ethers";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const args = process.argv.slice(2);
  const contractAddress = args[0];
  const voterAddress = args[1];
  
  console.log("Interacting with the contract at address: ", contractAddress);
  console.log("Granting voting rights to address: ", voterAddress);
  const ballotFactory = new Ballot__factory(wallet);
  const ballot = ballotFactory.attach(contractAddress) as Ballot;
  
  const tx = await ballot.giveRightToVote(voterAddress);
  console.log("Voting rights granted! Transaction hash: ", tx.hash);
  
  console.log("Attempting to grant another right to vote for address: ", voterAddress);

  const tx2 = await ballot.giveRightToVote(voterAddress).catch((Error) => {
    console.log("Oops, almost there :(");
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
