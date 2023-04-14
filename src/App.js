import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState();
  const [blockTransactions, setBlockTransactions] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    async function getBlockInfo() {
      setBlockInfo(await alchemy.core.getBlock(blockNumber));
    }

    getBlockInfo();
  }, [blockNumber]);

  useEffect(() => {
    async function getBlockTransactions() {
      setBlockTransactions(
        await alchemy.core.getBlockWithTransactions(blockNumber)
      );
    }

    getBlockTransactions();
  }, [blockNumber]);

  return (
    <>
      <h2 className="App">Block Number: {blockNumber}</h2>
      <div>
        {blockInfo && (
          <>
            <p>{blockInfo.hash}</p>
            <p>{blockInfo.miner}</p>
            <p>{blockInfo.nonce}</p>
            <p>{blockInfo.number}</p>
            <p>{blockInfo.parentHash}</p>
            <p>{blockInfo.timestamp}</p>
            <p>{blockInfo.transactions.length}</p>
          </>
        )}
        {console.log(blockTransactions)}
      </div>
    </>
  );
}

export default App;
