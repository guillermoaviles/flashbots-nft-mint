import { ethers } from "ethers";

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  "X-wCXLJfkRiiu676ApR7wnV5FfoNQu3m"
);

async function main() {
  console.log(await provider.getBlockNumber());
}

main();
