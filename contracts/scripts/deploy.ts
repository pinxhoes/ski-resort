import { config as dotenvConfig } from 'dotenv';
import * as hre from 'hardhat';
import { resolve } from 'path';
import { Provider, Wallet } from 'zksync-ethers';

dotenvConfig({ path: resolve(__dirname, '../.env') });

async function main() {
    console.log("Deploying SkiPass contract...");

    console.log("Private key loaded:", process.env.PRIVATE_KEY?.slice(0, 6) + "...");

    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    if (!PRIVATE_KEY)
        throw "⛔️ Private key not detected! Add it to the .env file!";

    // Initialize the provider
    const provider = new Provider("https://api.testnet.abs.xyz");

    // Initialize the wallet with provider
    const wallet = new Wallet(PRIVATE_KEY, provider);

    console.log("Wallet address:", await wallet.getAddress());

    // Get the factory
    const factory = await hre.ethers.getContractFactory("SkiPass", wallet);

    console.log("Deploying contract...");

    // Deploy the contract
    const skiPassContract = await factory.deploy();

    // Wait for the transaction to be mined
    console.log("Waiting for deployment transaction...");
    await skiPassContract.waitForDeployment();

    // Get the contract address
    const contractAddress = await skiPassContract.getAddress();
    console.log(`SkiPass contract deployed to ${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });