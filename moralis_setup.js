require('dotenv').config();
const Moralis = require('moralis').default;
const Chains = require('@moralisweb3/common-evm-utils');
const EvmChain = Chains.EvmChain;
const { abi } = require('./abis/usdcTestToken.json');

const options = {
  chains: [EvmChain.ETHEREUM], // use SEPOLIA or ETHEREUM
  description: 'USDC Transfers',
  tag: 'usdcTransfers',
  includeContractLogs: true,
  abi: abi,
  topic0: ['Transfer(address,address,uint256)'],
  webhookUrl: 'https://9ddf-104-250-131-79.ngrok-free.app' // when you test on local ```ngrok http {PORT} --region us``` replace the Forwarding url from the terminal
  // and for production use this one ```https://invest-dapp-798ad21b0525.herokuapp.com/```
};
Moralis.start({
  apiKey: process.env.MORALIS_KEY
}).then(async () => {
  const stream = await Moralis.Streams.add(options);
  const { id } = stream.toJSON();

  await Moralis.Streams.addAddress({
    id: id,
    address: [process.env.USDC_TOKEN_ADDRESS]
  });
});
