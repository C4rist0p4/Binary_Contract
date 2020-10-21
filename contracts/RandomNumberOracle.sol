pragma solidity >=0.4.21 <0.7.0;

contract RandomNumberOracle {
    event RequestRandom();
    uint256 public r_number = 0;

    function requestRandom() public returns (string memory) {
        emit RequestRandom();
        return "send";
    }

    function randomResponse(uint256 r) public {
        r_number = r;
    }
}
