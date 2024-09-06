import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AgentPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] pt-8">
      <Alert className="w-[70vw] bg-[#1d9bf0]">
        <RocketIcon className="h-6 w-6 " />
        <AlertTitle className="text-white text-2xl pb-4">
          Welcome to the Agent Management
        </AlertTitle>
        <AlertDescription className="text-white text-xl">
          This is a demo project. You can't actually create agents. The data is
          reset every time the server restarts.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AgentPage;
