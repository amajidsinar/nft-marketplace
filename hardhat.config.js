require("@nomiclabs/hardhat-waffle");
const fs=require("fs")
const projectId = "2c8b03db67884c50b69af1c1fe4db4ef"
const privateKey = fs.readFileSync(".secret").toString()
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  },
  solidity: "0.8.4",
};
