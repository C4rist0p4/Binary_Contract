var Web3 = require("web3");
var path = require("path");
var RandomNumberOracleArtifact = require(path.join(__dirname, "../build/contracts/RandomNumberOracle.json"));
var web3 = new Web3("ws://127.0.0.1:7545");
var account = "0xbFF9B880f2508DA7EF9aB9048473295aFB424547";
var address = "0x5ff4F50868521614c4607C99263ff8cb85982f59";
var RandomNumberOracle = new web3.eth.Contract(RandomNumberOracleArtifact.abi, address);
RandomNumberOracle.events.RequestRandom().on("data", function () {
    var random = Math.round(Math.random() * 10 + 1);
    console.log("event RequestRandom " + random);
    RandomNumberOracle.methods.randomResponse(random).send({
        from: account
    });
});
