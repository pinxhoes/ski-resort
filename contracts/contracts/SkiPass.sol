// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkiPass is ERC1155, Ownable {
    enum PassType {
        DAY,
        MULTIPLE_DAYS,
        SEASON
    }

    struct Resort {
        string name;
        bool isActive;
        address payable wallet;
    }

    struct Pass {
        PassType passType;
        uint256 resortId;
        uint256 price;
        uint256 duration; // in days
        bool active;
    }

    mapping(uint256 => Resort) public resorts;
    mapping(uint256 => Pass) public passes;

    uint256 private nextResortId = 1;
    uint256 private nextPassId = 1;

    // Updated constructor
    constructor() ERC1155("") Ownable() {}

    function addResort(
        string memory _name,
        address payable _wallet
    ) external onlyOwner {
        resorts[nextResortId] = Resort(_name, true, _wallet);
        nextResortId++;
    }

    function createPass(
        uint256 _resortId,
        PassType _type,
        uint256 _price,
        uint256 _duration
    ) external {
        require(resorts[_resortId].isActive, "Resort does not exist");
        require(msg.sender == resorts[_resortId].wallet, "Not resort owner");

        passes[nextPassId] = Pass(_type, _resortId, _price, _duration, true);
        nextPassId++;
    }

    function purchasePass(uint256 _passId) external payable {
        Pass memory pass = passes[_passId];
        require(pass.active, "Pass not available");
        require(msg.value >= pass.price, "Insufficient payment");

        Resort memory resort = resorts[pass.resortId];
        require(resort.isActive, "Resort not active");

        // Mint the pass NFT to the buyer
        _mint(msg.sender, _passId, 1, "");

        // Transfer payment to resort wallet
        (bool sent, ) = resort.wallet.call{value: msg.value}("");
        require(sent, "Failed to send payment");
    }
}
