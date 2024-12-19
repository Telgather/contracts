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

合约部署完后 将成功铸造出来的代码转移到多签地址 0x0D5D2564bf5a608009A32acB8E5ACC11495C5DA1  进行保管以及分配。

多签地址里一共是3个钱包地址，门槛是2。


