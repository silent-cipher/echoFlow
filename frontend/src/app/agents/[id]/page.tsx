"use client";
import { AgentsTabs } from "./components/AgentsTabs";
interface AgentIdPageProps {
  params: {
    id: string;
  };
}

const AgentIdPage: React.FC<AgentIdPageProps> = ({ params }) => {
  const { id } = params;
  return (
    <div className="min-h-screen pt-8">
      <AgentsTabs agent_id={id} />
    </div>
  );
};

export default AgentIdPage;
