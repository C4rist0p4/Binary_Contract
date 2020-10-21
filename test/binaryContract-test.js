const Web3 = require("web3");
const { waitForEvent } = require("./utils");
const binaryContract = artifacts.require("./binaryContract.sol");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8545")
);

contract("Price Ticker Tests", accounts => {
  const account = accounts;

  beforeEach(
    async () => (
      ({ contract } = await binaryContract.deployed(0.9, 200, true, account[1], {
        value: 1,
        from: account[0]
      })),
       ({ methods, events } = new web3.eth.Contract(
        contract._jsonInterface,
        contract._address
      ))
    )
  );

    it("Callback should log a new Price", async () => {
    const {
      returnValues: { price }
    } = await waitForEvent(events.LogPriceUpdate);
    priceUpdate = price;
    console.log(priceUpdate)
    assert.isAbove(parseFloat(price),
     0,
      "A price should have been retrieved from Provable call!"
    );
  });

  it("Call getWinner()", async () => {
      await methods.getWinner().call()
  });
});
