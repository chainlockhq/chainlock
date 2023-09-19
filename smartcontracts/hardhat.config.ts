import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import fs from "fs-extra";
import path from "path";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const pathExistsOrDie = (path: fs.PathLike) => {
  if (!fs.existsSync(path)) {
    throw new Error(`path '${path}' does not exist`);
  }
};

const pathIsFolderOrDie = (path: fs.PathLike) => {
  pathExistsOrDie(path);
  if (!fs.lstatSync(path).isDirectory()) {
    throw new Error(`path '${path}' is not a folder`);
  }
};

task(
  "frontend-types",
  "clean hardhat artifacts, recompile (generates new types) and copy typechain types to frontend",
  async (taskArgs, hre) => {
    console.log("---clearing hardhat artifacts...");
    await hre.run("clean");
    console.log("---cleaning success!");

    console.log("---compiling hardhat artifacts...");
    await hre.run("compile");
    console.log("---compiling success!");

    console.log("---validating folders...");

    const smartcontractsRootPath = hre.config.paths.root;
    pathIsFolderOrDie(smartcontractsRootPath);

    const smartcontractsTypechainPath = path.join(
      smartcontractsRootPath,
      hre.config.typechain.outDir
    );
    pathIsFolderOrDie(smartcontractsTypechainPath);

    const frontendRootPath = path.join(smartcontractsRootPath, "../frontend");
    pathIsFolderOrDie(frontendRootPath);

    const frontendTypechainPath = path.join(frontendRootPath, "src/typechain");
    pathIsFolderOrDie(frontendTypechainPath);

    console.log("---validating folders success!");

    console.log(`---removing ${frontendTypechainPath}...`);
    fs.rmdirSync(frontendTypechainPath, { recursive: true });
    console.log(`---removed ${frontendTypechainPath}!`);

    // eslint-disable-next-line prettier/prettier
    console.log(`---copying from ${smartcontractsTypechainPath} to ${frontendTypechainPath}...`);
    fs.copySync(smartcontractsTypechainPath, frontendTypechainPath);
    // eslint-disable-next-line prettier/prettier
    console.log(`---copied from ${smartcontractsTypechainPath} to ${frontendTypechainPath}!`);
  }
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      // fix issue with metamask chain id, see: https://hardhat.org/hardhat-network/docs/metamask-issue
      chainId: 1337,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    tests: "tests",
  },
};

export default config;
