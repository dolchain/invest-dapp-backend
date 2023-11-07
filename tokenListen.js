require('dotenv').config();
const ethers = require('ethers');
const { Transfered } = require('./supabase');
// Setup Contract
const { abi } = require('./abis/usdcTestToken.json');

const usdcAddress = process.env.USDC_TOKEN_ADDRESS;

console.log(process.env.NODE_ENV);
const provider =
  process.env.NODE_ENV === 'development'
    ? new ethers.WebSocketProvider(
        `wss://side-dawn-shape.ethereum-sepolia.quiknode.pro/${process.env.SEPOLIA_RPC_QUICKNODE_ID}/`
      )
    : new ethers.WebSocketProvider(
        `wss://convincing-white-wave.quiknode.pro/${process.env.MAINNET_RPC_QUICKNODE_ID}/`
      );
// const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo');
const usdcToken = new ethers.Contract(usdcAddress, abi, provider);

const tokenListen = async () => {
  try {
    usdcToken.on('Transfer', (from, to, value, event) => {
      // console.log('Event Fired:', event);
      amount = parseFloat(ethers.formatUnits(value, 6));
      if (amount >= 10000) console.log('Parameters:', from, to, amount);
      Transfered(event.log.transactionHash, from, to, amount);
    });
  } catch (error) {
    console.error('Error setting up event listener:', error);
  }
};

module.exports = tokenListen;
