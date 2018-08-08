/* 
 *
 * By Suttipong Kanakakorn
 *
 * API From
 * https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console
 * https://github.com/ethereum/wiki/wiki/JavaScript-API
*/

// This code has a bug. Your exercise is to fix it!

if (typeof web3 == 'undefined') {
  // This is likely the case when running from nodejs
  var Web3 = require('web3');
  // set the provider you want from Web3.providers
  var web3 = new Web3(new
    Web3.providers.HttpProvider("http://192.168.56.102:8545"));
} 

var argv = require('minimist')(process.argv.slice(2));

console.log(argv)
from_address_index = argv['from_index']
if (! from_address_index) {
  from_address_index = 0
  console.log("Using address index " + from_address_index) 
}
msg_array = argv['_']
msg = msg_array[0]
if (! msg) {
  console.log('Usage --from_index address_index "message"') 
  process.exit(1)
}

accounts = web3.eth.accounts;
// unlock from_account 600 secs
web3.personal.unlockAccount(accounts[from_address_index],"password1",6000)
from_account = accounts[from_address_index];
console.log("Using account: " + from_account)

// Replace the contract address with the one you created.
// This is not the account address
tweet_contract_address = "0x3db12984dfc41d31736e62eceaae19b61398287d"

// replace this abi with the correct abi from the “Interface” output of online
// compiler.
tweet_abi = []

tweet_contract = web3.eth.contract(tweet_abi).at(tweet_contract_address)
tx_hash = tweet_contract.tweet.sendTransaction("Beyond", {from: from_account, gas:1000})

tx_data = web3.eth.getTransaction(tx_hash)
console.log("Number of tweets:" + tweet_contract.getNumberOfTweets())

// After certain period, the tx would be processed and we should get tx_receipt
// with the block number
console.log('Getting tx_receipt if block contained tx is mined. Ctrl-c is okay')
// This could be improve by callback when tx is mined rather than sleeping

setTimeout(function(){
tx_receipt = web3.eth.getTransactionReceipt(tx_hash)
console.log('Got tx_receipt :' + tx_receipt + 
            'block#: ' + tx_receipt.blockNumber)
}, 3000);

