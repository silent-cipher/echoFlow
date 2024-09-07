import simpleLlmAbi from "./abis/simpleLlm.json";
import openApiChatGptAbi from "./abis/openApiChatGpt.json";
import agentAbi from "./abis/agent.json";
import agentManagerAbi from "./abis/agentManager.json";

const agentManager = {
  abi: agentManagerAbi,
  address: "0x68e639c42af0a6994B305B54C2c313c40a305eF5",
};

const simpleLlm = {
  abi: simpleLlmAbi,
  address: "0x68e639c42af0a6994B305B54C2c313c40a305eF5",
};

const openApiChatGpt = {
  abi: openApiChatGptAbi,
  address: "0x6bf17988CDd8685A9aeE850CBc879c8A708d6dF9",
};

const agent = {
  abi: agentAbi,
  address: "0x8a1D01c54e668064adaFff056593053100b8d8cB",
};

export { agentManager, simpleLlm, openApiChatGpt, agent };
