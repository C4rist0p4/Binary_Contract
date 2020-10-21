const binaryContract = artifacts.require("binaryContract.sol");
const integers = artifacts.require("Integers.sol");

module.exports = function(deployer) {
  deployer.deploy(integers);
  deployer.link(integers, binaryContract);
  deployer.deploy(binaryContract, 1, 200, true, "0x3c9ac44bc50d95080759f242cf31b4b464fba5cd", {
    value: 1,
    from: "0x161d0744d6bad087330b1c1dac3f16b94bd6bbb3"
  });
};