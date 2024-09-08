"use client";
import { useState, useEffect } from "react";
import useGetResponse from "@/hooks/useGetResponse";
import { AllAgents } from "@/components/components/AllAgents";
import { CreateNewAgents } from "@/components/components/CreateNewAgents";
import { LoadingTweetsAgents } from "@/components/components/LoadingTweetsAgents";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import { openApiChatGpt, agent, agentManager } from "../../config";

export interface Agent {
  agentId: string;
  agentAddress: string;
  name: string;
  description: string;
}

const message = `
    Analyze the sentiment of the following tweet:
    
    Tweet: ""\u201cAmerica First Legal (AFL) filed an amended lawsuit\u00a0against Apache, Cochise, Coconino, Gila, Graham, Greenlee, La Paz, Maricopa, Mohave, Navajo, Pima, Pinal, Santa Cruz, Yavapai, and Yuma for failing to remove non-citizens from its voter rolls.\u201d x.com/america1stlega\u2026""
    
    Provide the following information:
    - Overall sentiment: (positive, negative, neutral)
    - Keywords or topics identified in the tweet
    - A brief explanation of why the sentiment was classified that way`;
export default function Home() {
  // const [allAgents, setAllAgents] = useState([] as Agent[]);
  // const { getResponse, loading } = useGetResponse();
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  // const msgHistory = useReadContract({
  //   abi: simpleLlmAbi,
  //   address: "0xF6168876932289D073567f347121A267095f3DD6",
  //   functionName: "response",
  //   // args: [10000],
  // });

  const {
    data: deployedAllAgents,
    isLoading,
    isFetched,
  } = useReadContract({
    abi: agentManager.abi,
    address: agentManager.address as `0x${string}`,
    functionName: "getAgentsByOwner",
    args: [address],
  });
  const chatMessage = useReadContract({
    abi: agent.abi,
    address: agent.address as `0x${string}`,
    functionName: "isRunFinished",
    args: [0],
  });
  // console.log(msgHistory.data);
  // console.log(deployedAllAgents);

  // useEffect(() => {
  //   const fetchAllAgents = async () => {
  //     const response = await getResponse("agents");
  //     console.log(response);
  //     if (response) {
  //       setAllAgents(response);
  //     }
  //   };
  //   fetchAllAgents();
  // }, []);

  // const getTweetSentiment = async () => {
  //   const response = await writeContract(
  //     {
  //       abi: openApiChatGpt.abi,
  //       address: openApiChatGpt.address as `0x${string}`,
  //       functionName: "startChat",
  //       args: [message],
  //     },
  //     { onSuccess: (response) => console.log(response) }
  //   );
  // };

  // const getTweetSentimentFromAgent = async () => {
  //   const response = await writeContract(
  //     {
  //       abi: agent.abi,
  //       address: agent.address as `0x${string}`,
  //       functionName: "runAgent",
  //       args: [message, 1],
  //     },
  //     { onSuccess: (response) => console.log(response) }
  //   );
  // };

  return (
    <div className="min-h-screen">
      <main className="flex flex-row items-start justify-start flex-wrap pt-28 pl-8 pr-8 gap-8">
        <CreateNewAgents />
        {isLoading ? (
          <LoadingTweetsAgents />
        ) : (
          <AllAgents allAgents={(deployedAllAgents || []) as any} />
        )}
        {/* <button onClick={getTweetSentimentFromAgent}>getSentiment</button> */}
      </main>
    </div>
  );
}
