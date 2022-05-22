// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Scam.sol";
import "./WETH9.sol";
import "hardhat/console.sol";

contract Ico {
    enum Status {
        OPEN,
        CLOSED
    }

    Scam public scm;
    WETH9 public weth;
    Status private _status;
    address private _owner;

    uint256 public wethLimit = 100 ether;
    uint256 public wethInvested = 0;

    // uint256 private _claimDelay = 2 minutes;
    uint256 private _claimDelay = 2 seconds;
    uint256 private _claimWindow = 1 days;
    uint256 private _claimStart = 0;
    uint256 private _claimEnd = 0;

    uint256 private _multRate = 10;

    mapping(address => uint256) investments;

    constructor(WETH9 _weth) {
        scm = new Scam();
        weth = _weth;

        _status = Status.OPEN;
        _owner = payable(msg.sender);
    }

    function remaining() public view returns (uint256) {
        return wethLimit - wethInvested;
    }

    function wethAllowance(address account) public view returns (uint256) {
        return weth.allowance(account, address(this));
    }

    function claimableAmount(address account) public view returns (uint256) {
        return investments[account] * _multRate;
    }

    function invest(uint256 amount) external {
        require(_status == Status.OPEN, "investment phase is closed");
        require(
            wethAllowance(msg.sender) >= amount,
            "insufficient WETH allowance"
        );

        // when invested amount is larger then remaining amount
        if (amount > remaining()) {
            amount = remaining();
        }

        wethInvested += amount;
        weth.transferFrom(msg.sender, address(this), amount);
        investments[msg.sender] += amount;

        // when investment goal is reached
        if (remaining() == 0) {
            _status = Status.CLOSED;
            _claimStart = block.timestamp + _claimDelay;
            _claimEnd = _claimStart + _claimWindow;
        }
    }

    function claim() external {
        require(_status != Status.OPEN, "investment phase is still open");
        require(
            _claimStart <= block.timestamp,
            "claiming phase is not yet open"
        );
        require(block.timestamp <= _claimEnd, "claiming phase is over");

        uint256 claimable = claimableAmount(msg.sender);
        require(claimable > 0, "nothing to claim");

        investments[msg.sender] = 0;
        scm.mint(msg.sender, claimable);
    }
}
