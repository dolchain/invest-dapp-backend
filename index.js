const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
// const tokenListen = require('./tokenListen');

app.post('/*', async (req, res)  => {
  if(!req.body.confirmed)
  req.body.erc20Transfers.map(log => {
    console.log(log.transactionHash, log.from, log.to, parseFloat(ethers.formatUnits(log.value, 6)));
    Transfered(log.transactionHash, log.from, log.to, parseFloat(ethers.formatUnits(log.value, 6)));
  });
});
// readableState,_events,_eventsCount,_maxListeners,socket,httpVersionMajor,httpVersionMinor,httpVersion,complete,rawHeaders,rawTrailers,joinDuplicateHeaders,aborted,upgrade,url,method,statusCode,statusMessage,client,_consuming,_dumped,next,baseUrl,originalUrl,_parsedUrl,params,query,res,route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // tokenListen();
});
