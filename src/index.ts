import { BigNumber, ethers, Wallet } from "ethers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle"
require('dotenv').config();

if (process.env.ALCHEMY_API_KEY === undefined) {
    console.error("Please provide ALCHEMY_API_KEY env")
    process.exit(1)
}

if (process.env.WALLET_PRIVATE_KEY === undefined) {
    console.error("Please provide WALLET_PRIVATE_KEY env")
    process.exit(1)
}

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.ALCHEMY_API_KEY
);

const FLASHBOTS_ENDPOINT = "https://relay-goerli.flashbots.net";
const GWEI = BigNumber.from(10).pow(9)

const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, provider);

async function main() {
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, Wallet.createRandom(), FLASHBOTS_ENDPOINT)
    provider.on('block', (blockNumber) => {
        console.log(blockNumber)
        flashbotsProvider.sendBundle(
          [
            {
                transaction: {
                    chainId: 5,
                    type: 2,    // EIP1559 transaction type
                    value: BigNumber.from(0),
                    gasLimit: 50000,
                    data: "0x",
                    maxFeePerGas: GWEI.mul(3),
                    maxPriorityFeePerGas: GWEI.mul(2),
                    to: "0x957B500673A4919C9394349E6bbD1A66Dc7E5939"
                    // "0x957B500673A4919C9394349E6bbD1A66Dc7E5939"
                    // "0x20EE855E43A7af19E407E39E5110c2C1Ee41F64D"
                },
                signer: wallet
            }
          ], blockNumber + 1
        )
    })
}

main();
