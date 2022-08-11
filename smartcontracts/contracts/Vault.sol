// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "hardhat/console.sol";

contract Vault {

  event SecretCreated(address member, uint secretId);

  struct Member {
    string encryptedPrivateKey;
    string publicKey;
    uint[] secretIds;
  }

  struct Secret {
    string publicLabel;
    string encryptedUsername;
    string encryptedPassword;
  }

  /**
   list of addresses that are allowed to join this vault as a member
   */
  mapping(address => bool) public pendingMembers;

  /**
   All members currently in the vault, their private key, public key and passwords
   */
  mapping(address => Member) public members;

  /**
   All secrets currently in the vault.
   */
  Secret[] public secrets;

  constructor(address firstPendingMember) {
    // we need one pending member to bootstrap the vault
    pendingMembers[firstPendingMember] = true;
  }

  modifier onlyPendingMember {
    require(pendingMembers[msg.sender], "sender not a pending member");
    _;
  }

  function isMember(address addr) public view returns(bool) {
    return bytes(members[addr].publicKey).length > 0;
  }

  modifier onlyMember {
    // address is a member if its public key is in the vault
    require(isMember(msg.sender), "sender not a member");
    _;
  }

  function secretExists(uint secretId) public view returns(bool) {
    return secretId < secrets.length;
  }

  modifier onlyIfSecretExists(uint secretId) {
    require(secretExists(secretId), "secret does not exist");
    _;
  }

  function addPendingMember(address addr) public onlyMember {
    pendingMembers[addr] = true;
  }

  function joinVault(
    string calldata encryptedPrivateKey,
    string calldata publicKey
  ) external onlyPendingMember {
    pendingMembers[msg.sender] = false;
    members[msg.sender] = Member(encryptedPrivateKey, publicKey, new uint[](0));
  }

  function getOwnEncryptedPrivateKey() external view onlyMember returns(string memory) {
    return members[msg.sender].encryptedPrivateKey;
  }

  function getPublicKey(address addr) external view onlyMember returns(string memory) {
    return members[addr].publicKey;
  }

  function getOwnSecretIds() external view onlyMember returns(uint[] memory) {
    return members[msg.sender].secretIds;
  }

  // store a secret for yourself
  function storeSecret(
    string calldata publicLabel,
    string calldata encryptedUsername,
    string calldata encryptedPassword
  ) external onlyMember returns(uint) {
    // create secret
    secrets.push(Secret(publicLabel, encryptedUsername, encryptedPassword));
    uint secretId = secrets.length - 1;

    // add secret to member
    members[msg.sender].secretIds.push(secretId);

    // emit event
    emit SecretCreated(msg.sender, secretId);

    return secretId;
  }

  // get any secret
  function getSecret(
    uint secretId
  ) external view onlyIfSecretExists(secretId) returns(Secret memory) {
    return secrets[secretId];
  }
  
}
