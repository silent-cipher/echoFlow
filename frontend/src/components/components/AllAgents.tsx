import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Agent } from "@/app/page";

type CardProps = React.ComponentProps<typeof Card> & {
  allAgents: Agent[];
};

export function AllAgents({ className, ...props }: CardProps) {
  const allAgents = props.allAgents;

  return (
    <>
      {allAgents.map(
        (agent: {
          name: string;
          description: string;
          agentId: string;
          agentAddress: string;
        }) => {
          return (
            <Link href={`/agents/${agent.agentId}`} key={agent.agentId}>
              <Card className={cn("w-[380px]", className)} {...props}>
                <CardHeader>
                  <div className="flex flex-row gap-4">
                    <CardTitle>
                      <Avatar>
                        <AvatarImage src="/logo.png" />
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                    </CardTitle>
                    <CardDescription>{agent.name}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 overflow-y-scroll h-28 scrollbar-hide">
                  {agent.description}
                </CardContent>
              </Card>
            </Link>
          );
        }
      )}
    </>
  );
}
