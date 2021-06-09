const WTH = artifacts.require('WTH.sol');
const MockHRC20 = artifacts.require('MockHRC20.sol');
const MakiToken = artifacts.require('MakiToken.sol');
const MasterChef = artifacts.require('MasterChef.sol');
const SoyBar = artifacts.require('SoyBar.sol');

const SmartChefFactory = artifacts.require('SmartChefFactory.sol');
const SousChef = artifacts.require('SousChef.sol');

module.exports = async function(deployer, addresses) {
// Deploy Maki Token Contract
    await deployer.deploy(MakiToken)
    const makiToken = await MakiToken.deployed()

// Deploy Soy Token Contract
    await deployer.deploy(SoyBar, makiToken.address)
    const soyToken = await SoyBar.deployed()

// Deploy MasterChef Contract
  await deployer.deploy(
    MasterChef,
    makiToken.address,
    soyToken.address
  )
 
// Make MasterChef contract token owner for makiToken and soyToken
  const masterChef = await MasterChef.deployed()
  await makiToken.transferOwnership(masterChef.address)
  await soyToken.transferOwnership(masterChef.address)

// Deploy SmartChefFactory Contract
await deployer.deploy(
  SmartChefFactory
)

// Deploy SousChef Contract
await deployer.deploy(
  SousChef
)

}
