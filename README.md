# contracts

```shell
# install dependencies
npm i
# clean build folder
npx hardhat clean
# compile smart contracts
npx hardhat compile
# run unittest
npx hardhat test
# deploy smart contracts
npx hardhat run --network arb_oft oft_scripts/1_deploy_oft.js

# transefer owner 
npx hardhat run --network arb_oft oft_scripts/6_transfer_owner.js
```

Following the deployment of the smart contract, mint the tokens and transfer them securely to the multisignature address. This address is safeguarded by multiple wallets, requiring over 50% approval to authorize any transactions.


