pragma solidity >=0.5.0 <0.7.0;
import "./provableAPI.sol";
import "./Integers.sol";

contract binaryContract is usingProvable {
    using Integers for uint256;
    address payable owner;
    address payable counterparty;
    uint256 startTime;
    uint256 inset;
    uint256 pricestart;
    string priceUpdate;
    bool lowheight;

    event LogPriceUpdate(string price);

    constructor(
        uint256 _inset,
        uint256 _pricestart,
        bool _lowheight,
        address payable _counterparty
    ) public payable {
        require(msg.value == _inset, "Not enough ether");
        inset = _inset;
        owner = msg.sender;
        pricestart = _pricestart;
        lowheight = _lowheight;
        counterparty = _counterparty;
        provable_query(
            20,
            "URL",
            "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price"
        );
        startTime = now;
    }

    function __callback(bytes32 _myid, string memory result) public {
        require(
            msg.sender == provable_cbAddress(),
            "Sender is not Provable contract"
        );
        priceUpdate = result;
        emit LogPriceUpdate(priceUpdate);
        getWinner();
    }

    function countTime() public view returns (int256) {
        int256 countedSec = int256((120 seconds) - (now - startTime));
        if (countedSec > 0) {
            return countedSec;
        }
        return 0;
    }

    function getWinner() public payable {
        uint256 priceUpdate_ = Integers.parseInt(priceUpdate);
        require(priceUpdate_ > 0, "Contract need more Time");
        if (priceUpdate_ > pricestart && lowheight == true) {
            selfdestruct(counterparty);
        } else if (priceUpdate_ < pricestart && lowheight == false) {
            selfdestruct(counterparty);
        }
        selfdestruct(owner);
    }
}
