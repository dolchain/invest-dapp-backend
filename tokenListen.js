const ethers = require('ethers');
const {Transfered} = require('./supabase')
// Setup Contract
const { abi } = require('./abis/usdcTestToken.json')

const tokenListen = async () => {
  const usdcAddress = "0xc493e7373757C759cf589731eE1cFaB80b13Ed7a";
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo');
  console.log("SEPOLIA_RPC_URL", process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL);
  const usdcToken = new ethers.Contract(usdcAddress, abi, provider);
  try {
    usdcToken.on('Transfer', (from, to, value, event) => {
      // console.log('Event Fired:', event);
      console.log('Parameters:', from, to, value);
      // updateUserBalance(from, to, -parseFloat(ethers.formatUnits(value, 6)));
      Transfered(event.log.transactionHash, from, to, parseFloat(ethers.formatUnits(value, 6)));
    });
  } catch (error) {
    console.error("Error setting up event listener:", error);
  }
}

module.exports = tokenListen;