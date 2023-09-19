import hre, { ethers } from "hardhat";
import "dotenv/config";
import * as VaultFactory from "../artifacts/contracts/VaultFactory.sol/VaultFactory.json";

// NOTE: use env var HARDHAT_NETWORK to switch between one of the configurations defined in hardhat.config.ts
//       e.g.: `HARDHAT_NETWORK=localhost ts-node scripts/vaultFactoryDeploy.ts`
//       docs: https://hardhat.org/hardhat-runner/docs/advanced/scripts

// log selected configuration
console.log(`selected configuration: ${hre.network.name}`);

// log available configurations
const confs = Object.keys(hre.config.networks).join(", ");
console.log(`\tavailable configurations: ${confs}`);
// eslint-disable-next-line prettier/prettier
console.log(
  `\texample usage: HARDHAT_NETWORK=sepolia ts-node scripts/vaultFactoryDeploy.ts`
);

// helpful error messages
if (!["hardhat", "localhost"].includes(hre.network.name)) {
  // verify private key is configured
  if (!process.env.PRIVATE_KEY?.trim()) {
    console.error("ERROR: env var PRIVATE_KEY not provided");
    process.exit(1);
  }

  // verify infura is configured
  if (!process.env.SEPOLIA_URL?.trim()) {
    console.error("ERROR: env var SEPOLIA_URL not provided");
    process.exit(1);
  }
}

async function main() {
  // (re)compile contracts
  await hre.run("compile");

  // get signers
  const signers = await ethers.getSigners();

  // get first signer
  const firstSigner = signers[0];
  console.log(`signer address: ${firstSigner.address}`);

  // get account balance
  const balanceBN = await firstSigner.getBalance();
  console.log(`signer balance (BigNumber): ${balanceBN}`);

  // format balance to ether
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`signer balance (ETH): ${balance}`);

  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // create factory for contract: VaultFactory
  const vaultFactoryFactory = new ethers.ContractFactory(
    VaultFactory.abi,
    VaultFactory.bytecode,
    firstSigner
  );

  // deploy contract: VaultFactory
  console.log("deploying VaultFactory...");
  const vaultFactoryContract = await vaultFactoryFactory.deploy();

  // wait for confirmations
  console.log("awaiting confirmations...");
  await vaultFactoryContract.deployed();
  console.log("completed!");

  console.log(`VaultFactory deployed at ${vaultFactoryContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
