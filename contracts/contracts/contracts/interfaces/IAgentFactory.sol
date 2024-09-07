// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IAgentFactory {
    // Function to deploy a new Agent

    function deployAgent(
        address initialOracleAddress,
        string memory systemPrompt
    ) external returns (address);

    // Function to get all agents deployed by a specific owner
    function getAgentsByOwner(
        address owner
    ) external view returns (address[] memory);

    // Function to get the address of an Agent by its ID
    function getAgentById(uint256 agentId) external view returns (address);
}
