const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const TelgatherToken = await hre.ethers.getContractFactory("TelgatherToken");
  let token = await TelgatherToken.deploy(
    "Token of Games Test",
    "TOGTest",
    "0x1a44076050125825900e736c501f859c50fE728c",
    e18("10000000000")
  );
  await token.deployed();

  console.log("token: ", token.address, "\n", "deployer: ", deployer.address);
}

function e18(x) {
  return hre.ethers.BigNumber.from("1000000000000000000").mul(x);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
