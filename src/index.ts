import { ethers, Wallet } from "ethers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle"

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  "X-wCXLJfkRiiu676ApR7wnV5FfoNQu3m"
);

const FLASHBOTS_ENDPOINT = "https://relay-goerli.flashbots.net";

async function main() {
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, Wallet.createRandom(), FLASHBOTS_ENDPOINT)
    provider.on('block', (blockNumber) => {
        console.log(blockNumber);
    })
}

main();
