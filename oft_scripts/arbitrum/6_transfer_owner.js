const hre = require("hardhat");

const tokenAdddr = ""
const multisig = ""

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const TelgatherToken = await hre.ethers.getContractFactory("TelgatherToken");
    let token = await TelgatherToken.attach(tokenAdddr);

    let tx
    tx = await token.transferOwnership(multisig)
    await tx.wait()

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
