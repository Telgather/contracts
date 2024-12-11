const hre = require("hardhat");

const tokenAddr = "0x9058Be253db2c1d54Ed6b6eaA661bb1B066B9F5b"

const receiver = "0x0000000000000000000000005b26444baCBFf910737Fc1A51C42ebDA312Cd55b"

// 6Pf6wJFk6vznzRUizbmwTzPUXgHHEPi5U7A7ELnDuEsB
// const receiver = "0x50184b7e1fb344eb289a5259dcb98bf16c9f11d4a72faa0bee88511eb1798f72"

const SolanaEid = 30168
const EthereumEid = 30101
const BaseEid = 30184
const LineaEid = 30183

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const TelgatherToken = await hre.ethers.getContractFactory("TelgatherToken");
    let token = await TelgatherToken.attach(tokenAddr);

    let tx

    tx = await token.quoteSend({
        dstEid: EthereumEid,
        to: receiver,
        amountLD: e18(10),
        minAmountLD: e18(10),
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x",
    }, false)

    tx = await token.send({
        dstEid: EthereumEid,
        to: receiver,
        amountLD: e18(10),
        minAmountLD: e18(10),
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x",
    }, {
        nativeFee: tx.nativeFee,
        lzTokenFee: 0
    }, deployer.address, {value: tx.nativeFee})
    await tx.wait()
}

function e18(x) {
    return hre.ethers.BigNumber.from("1000000000000000000").mul(x)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});