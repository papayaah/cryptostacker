pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';
import '@openzeppelin/contracts/ownership/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

/**
 * @title Score token
 * @dev Derive from ERC721 token
 */
contract ScoreToken is ERC721Full, Ownable {
  constructor() ERC721Full("ScoreToken", "STAC") public {}

  mapping (address => uint) public scoreToOwner;

  function setScore(uint score) public {
    scoreToOwner[msg.sender] = score;
  }

  function getScore(address) external view returns (uint) {
    return scoreToOwner[msg.sender];
  }
}
