const hre = require("hardhat");

const tokenAddr = "0x9058Be253db2c1d54Ed6b6eaA661bb1B066B9F5b"  // fix
// OFT Config Address. Base64 -> Hex
const tokenAddrArbitrum = "0x0000000000000000000000009058Be253db2c1d54Ed6b6eaA661bb1B066B9F5b"  //fix

const SolanaEid = 30168
const ArbitrumEid = 30110

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const TelgatherToken = await hre.ethers.getContractFactory("TelgatherToken");
    let token = await TelgatherToken.attach(tokenAddr);

    let tx

    tx = await token.setPeer(ArbitrumEid, tokenAddrArbitrum)
    await tx.wait()

    tx = await token.setEnforcedOptions([{
        eid: ArbitrumEid,
        msgType: 1,
        options: "0x00030100210100000000000000000000000000030d40000000000000000000000000002625a0",
    }])
    await tx.wait()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});