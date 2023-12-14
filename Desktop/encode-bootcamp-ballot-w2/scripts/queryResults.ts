import { EtherscanProvider, ethers } from "ethers";
import * as dotenv from "dotenv";
import { Ballot, Ballot__factory } from "../typechain-types";
import { Wallet } from "ethers";
dotenv.config();

async function main() {
  //const provider = new EtherscanProvider("sepolia");
  //const provider = ethers.getDefaultProvider("sepolia");
  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const args = process.argv.slice(2);
  const contractAddress = args[0];
  console.log("Interacting with the smart contract at address: ", contractAddress);
  console.log("Let's Announce who the winner is!");
  const ballotFactory = new Ballot__factory(wallet);
  const ballot = ballotFactory.attach(contractAddress) as Ballot;

  const tx = await ballot.winningProposal();
  console.log(
    "The winner proposal is...: ",
    ethers.decodeBytes32String(await ballot.getWinningProposalName()))
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
