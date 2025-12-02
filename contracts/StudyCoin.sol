// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StudyCoin {
    
    string public name = "StudyCoin";
    string public symbol = "SDC";
    uint8 public decimals = 18;  // numero de casas decimais da moeda
    uint256 public totalSuplay = 1000 * 10 ** decimals;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    // Armazena o saldo dos portadores da moeda
    mapping (address => uint256) private _balances;

    // adiciona todas as moedas ao dono do contrato
    constructor(){
        _balances[msg.sender] = totalSuplay;
    }

    // busca o saldo da carteira
    function balanceOf(address _owner) public view returns (uint256 balance){
        return _balances[_owner];
    }

    // Faz a transferencia de moedas entre carteiras
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf(msg.sender) >= _value, "Insufficient balance");

        _balances[msg.sender] -= _value;
        _balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

}
