import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AgentsTabs() {
  return (
    <Tabs defaultValue="create-tweets" className="w-lvw p-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="create-tweets">Create Tweets</TabsTrigger>
        <TabsTrigger value="tweets-sentiments">Tweets sentiments</TabsTrigger>
      </TabsList>
      <TabsContent value="create-tweets">
        <Card>
          <CardHeader>
            <CardTitle>Create Tweets for the agent</CardTitle>
            <CardDescription>
              Create tweets for the agent. You can create multiple tweets at
              once
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 h-[60vh] overflow-y-scroll"></CardContent>
          <CardFooter>
            <Textarea
              rows={1}
              placeholder="Generate tweets for the agent...."
            />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tweets-sentiments">
        <Card>
          <CardHeader>
            <CardTitle>Tweets Sentiments Analysis by AI</CardTitle>
            <CardDescription>
              Analyze the sentiments of the tweets created by the agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 h-[60vh] overflow-y-scroll"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
