import RandomNumberOracle from './contracts/RandomNumberOracle.json';

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
    contracts: [RandomNumberOracle],
    web3: {
      fallback: {
        type: "ws",
        url: "ws://127.0.0.1:7545",
      },
    },
  };

  export default options;