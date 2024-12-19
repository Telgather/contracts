const hre = require("hardhat");

const tokenAdddr = "0x44655a076914CAB98d1CEE823a60A0B8DA00659f"
const multisig = "0x0D5D2564bf5a608009A32acB8E5ACC11495C5DA1"

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
