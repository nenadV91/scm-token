// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Scam is ERC20 {
    address public owner;

    constructor() ERC20("Scam", "SCM") {
        owner = msg.sender;
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == owner, "method not allowed");
        _mint(account, amount);
    }
}
