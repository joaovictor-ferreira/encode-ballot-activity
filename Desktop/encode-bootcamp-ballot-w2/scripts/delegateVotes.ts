import { EtherscanProvider, ethers } from "ethers";
import * as dotenv from 'dotenv';
import { Ballot, Ballot__factory } from "../typechain-types";
import { Wallet } from "ethers";
dotenv.config();

async function main() {

    //const provider = new EtherscanProvider("sepolia");
    //const provider = ethers.getDefaultProvider("sepolia");
    const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const args = process.argv.slice(2);
    const contractAddress = args[0];
    const voterAddress = args[1];
    console.log("Interacting with the contract: ", contractAddress);
    console.log("Delegating the vote to...", voterAddress);
    const ballotFactory = new Ballot__factory(wallet);
    const ballot =  ballotFactory.attach(contractAddress) as Ballot;

    //const tx = await ballot.giveRightToVote("0x038895393658620348C5aC656153D8C8a951CF13");
    const tx = await ballot.delegateVote(voterAddress);
    console.log("Process completed! Transaction hash: ", tx.hash)
    console.log(`Confirmation: ${(await ballot.voters(wallet.address)).delegateVote}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });