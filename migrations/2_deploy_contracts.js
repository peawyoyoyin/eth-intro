// require the contract
var Token = artifacts.require('./Token.sol')

module.exports = function(deployer, network) {
  // deploy the contract with the given constructor arguments
  if(network === 'develop') {
    deployer.deploy(Token, 4332, 'test token', 4, 'TST')
  } else if (network === 'deveth') {
    const source = '0x3883a33719f659da466a8edd95793033cf985f43'
    web3.personal.unlockAccount(source, '', 600)
    web3.eth.isSyncing(console.log)
    deployer.deploy(Token, 10000000000, 'test token', 6, 'TST', {from: source})
  }
}