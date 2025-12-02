// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StudyCoin {
    
    string public name = "StudyCoin";
    string public symbol = "SRC";
    uint8 public decimals = 18;  // numero de casas decimais da moeda
    uint256 public totalSuplay = 1000 * 10 ** decimals;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}
