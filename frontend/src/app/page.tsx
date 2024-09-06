"use client";
import { useState, useEffect } from "react";
import useGetResponse from "@/hooks/useGetResponse";
import { AllAgents } from "@/components/components/AllAgents";
import { CreateNewAgents } from "@/components/components/CreateNewAgents";
import { LoadingTweetsAgents } from "@/components/components/LoadingTweetsAgents";

interface Agent {
  agent_id: string;
  tweets_id: string;
  name: string;
  description: string;
}
export default function Home() {
  const [allAgents, setAllAgents] = useState([] as Agent[]);
  const { getResponse, loading } = useGetResponse();

  useEffect(() => {
    const fetchAllAgents = async () => {
      const response = await getResponse("agents");
      console.log(response);
      if (response) {
        setAllAgents(response);
      }
    };
    fetchAllAgents();
  }, []);

  return (
    <main className="flex min-h-screen flex-row items-start justify-start flex-wrap p-12 gap-8">
      <CreateNewAgents />
      {loading ? <LoadingTweetsAgents /> : <AllAgents allAgents={allAgents} />}
    </main>
  );
}
