// This script contains the function for deployment and verification of the `contracts/PositiveEvenSetter.sol`.

import hre from "hardhat";
const ethers = hre.ethers;

import type { PositiveEvenSetter } from "../../../../typechain-types";

async function deployPositiveEvenSetter(): Promise<PositiveEvenSetter> {
    /*
     * Hardhat always runs the compile task when running scripts with its command line interface.
     *
     * If this script is run directly using `node`, then it should be called compile manually
     * to make sure everything is compiled.
     */
    // await hre.run("compile");

    const [deployer] = await ethers.getSigners();

    // Deployment.
    const PositiveEvenSetter = (await ethers.getContractFactory("PositiveEvenSetter")).connect(deployer);
    const positiveEvenSetter: PositiveEvenSetter = await PositiveEvenSetter.deploy();

    await positiveEvenSetter.deployed();

    console.log(`\`positiveEvenSetter\` is deployed to ${positiveEvenSetter.address}.`);

    // Verification of the deployed contract.
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("Sleeping before verification...");
        await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds.

        await hre.run("verify:verify", { address: positiveEvenSetter.address, constructorArguments: [] });
    }

    return positiveEvenSetter;
}

export { deployPositiveEvenSetter };
