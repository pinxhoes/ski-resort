import { config as dotenvConfig } from 'dotenv';
import * as hre from 'hardhat';
import { resolve } from 'path';
import { Provider, Wallet } from 'zksync-ethers';

dotenvConfig({ path: resolve(__dirname, '../.env') });

async function main() {
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    if (!PRIVATE_KEY) throw "⛔️ Private key not detected! Add it to the .env file!";

    // Contract address from previous deployment
    const CONTRACT_ADDRESS = "0x87efA50e9eDa9db666DFA3Fe63bb8E0310aCAEc2";

    // Initialize provider and wallet
    const provider = new Provider("https://api.testnet.abs.xyz");
    const wallet = new Wallet(PRIVATE_KEY, provider);
    console.log("Wallet address:", await wallet.getAddress());

    // Get the contract instance
    const SkiPass = await hre.ethers.getContractFactory("SkiPass", wallet);
    const contract = SkiPass.attach(CONTRACT_ADDRESS);

    // Test addResort function
    console.log("\nTesting addResort function...");
    const resortName = "Alpine Valley Resort";
    const resortWallet = wallet.address; // Using same wallet for testing
    const addResortTx = await contract.addResort(resortName, resortWallet);
    await addResortTx.wait();
    console.log("Resort added successfully!");

    // Get resort details
    console.log("\nGetting resort details...");
    const resort = await contract.resorts(1);
    console.log("Resort Name:", resort.name);
    console.log("Resort Active:", resort.isActive);
    console.log("Resort Wallet:", resort.wallet);

    // Test createPass function
    console.log("\nTesting createPass function...");
    const createPassTx = await contract.createPass(
        1, // resortId
        0, // PassType.DAY
        hre.ethers.parseEther("0.01"), // price in ETH
        1 // duration in days
    );
    await createPassTx.wait();
    console.log("Pass created successfully!");

    // Get pass details
    console.log("\nGetting pass details...");
    const pass = await contract.passes(1);
    console.log("Pass Type:", pass.passType);
    console.log("Pass Resort ID:", pass.resortId);
    console.log("Pass Price:", hre.ethers.formatEther(pass.price), "ETH");
    console.log("Pass Duration:", pass.duration.toString(), "days");
    console.log("Pass Active:", pass.active);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });