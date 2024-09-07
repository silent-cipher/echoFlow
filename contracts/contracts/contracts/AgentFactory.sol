// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Agent.sol";

// @title AgentManager
// @notice This contract is used to deploy new Agent contracts
contract AgentManager {
    // Event to emit when a new Agent is deployed
    event AgentDeployed(
        address indexed agentAddress,
        address indexed owner,
        uint256 agentId
    );

    struct AgentMetadata {
        address agentAddress;
        uint256 agentId;
        string name;
        string description;
        bool isForTweet;
    }

    // Mapping to track the agents deployed by each user
    mapping(address => AgentMetadata[]) public agentsByOwner;

    // Mapping to associate an agent's ID with the deployed agent contract address
    mapping(uint256 => address) public agentIdToAddress;

    // Counter for assigning unique IDs to each agent
    uint256 public agentCounter;

    // Owner of the contract
    address public managerOwner;

    constructor() {
        agentCounter = 0; // Initialize agent counter
        managerOwner = msg.sender; // Set the contract owner
    }

    // Function to deploy a new Agent contract
    function deployAgent(
        address initialOracleAddress,
        string memory systemPrompt,
        string memory _name,
        string memory _description,
        bool _isForTweet
    ) external {
        // Create a new Agent contract instance
        Agent newAgent = new Agent(initialOracleAddress, systemPrompt);

        // Increment the agent counter to get a unique ID
        agentCounter++;

        AgentMetadata memory newAgentMetadata = AgentMetadata({
            agentAddress: address(newAgent),
            agentId: agentCounter,
            name: _name,
            description: _description,
            isForTweet: _isForTweet
        });

        // Store the deployed Agent contract address for the owner
        agentsByOwner[msg.sender].push(newAgentMetadata);

        // Map the agent ID to the Agent contract address
        agentIdToAddress[agentCounter] = address(newAgent);

        // Emit an event with the new Agent's address and owner
        emit AgentDeployed(address(newAgent), msg.sender, agentCounter);
    }

    // Function to get all agents deployed by a specific owner
    function getAgentsByOwner(
        address owner
    ) external view returns (AgentMetadata[] memory) {
        return agentsByOwner[owner];
    }

    // Function to get the address of an Agent by its ID
    function getAgentById(uint256 agentId) external view returns (address) {
        return agentIdToAddress[agentId];
    }

    // Function to get Global agents
    function getGlobalAgents() external view returns (AgentMetadata[] memory) {
        return agentsByOwner[managerOwner];
    }
}
