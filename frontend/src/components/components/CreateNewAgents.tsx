import { TiDocumentAdd } from "react-icons/ti";
import { CreateNewAgentPopUp } from "@/components/components/CreateNewAgentPopUp";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function CreateNewAgents({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Create App</CardTitle>
        <CardDescription>Your Twitter Ai Agents</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-start gap-3">
          <CreateNewAgentPopUp />
        </div>
        <div className="flex items-center justify-start pl-3.5 pb-2">
          <TiDocumentAdd className="mr-2 h-6 w-6" /> Create From Template
        </div>
      </CardContent>
    </Card>
  );
}
