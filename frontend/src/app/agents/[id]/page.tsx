"use client";

interface AgentIdPageProps {
  params: {
    id: string;
  };
}

const AgentIdPage: React.FC<AgentIdPageProps> = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <h1>Agent ID : {id}</h1>
    </div>
  );
};

export default AgentIdPage;
