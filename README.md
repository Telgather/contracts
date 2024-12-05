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
npx hardhat run oft_scripts/1_deploy_oft.js

# deploy smart contracts on bnb testnet
npx hardhat run --network arb_oft oft_scripts/1_deploy_oft.js

npx hardhat run --network arb_oft oft_scripts/2_generate_options.js

npx hardhat run --network arb_oft oft_scripts/3_set_config.js

npx hardhat run --network arb_oft oft_scripts/4_set_peer.js


```

