// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {

    // mapping datatype to store domains
    mapping (string => address) public domains;

    //values mapping
    mapping (string => string) records;    
    constructor() {
        console.log("My first contract");
    }

    // register func to add names to mapping
    function register(string calldata name) public {

        // check if name registered
        require(domains[name]==address(0));
        domains[name] = msg.sender;
        console.log("%s has registered a domain", msg.sender);
    }

    // get domain owner address
    function getAddress(string calldata name) view public returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // check if sender is owner
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name) view public returns (string memory) {
        return records[name];
    }


}