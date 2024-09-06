"use client";
import { MdPostAdd } from "react-icons/md";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import usePostResponse from "@/hooks/usePostResponse";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";

export function CreateNewAgentPopUp() {
  const [newAgentData, setNewAgentData] = useState({
    app_name: "",
    tweets_id: "",
    app_desc: "",
  });
  const { postResponse, loading } = usePostResponse();
  const router = useRouter();

  const handleCreate = async () => {
    const agentData = {
      name: newAgentData.app_name,
      tweets_id: newAgentData.tweets_id,
      description: newAgentData.app_desc,
    };
    const response = await postResponse(agentData, "agents");
    if (response.agent_id != "" && response.agent_id != undefined) {
      router.push(`/agents/${response.agent_id}`);
    }
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewAgentData({ ...newAgentData, [e.target.name]: e.target.value });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <MdPostAdd className="mr-2 h-6 w-6" />
          Create From Blank
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create From Blank</DialogTitle>
          <DialogDescription>
            What type of agent would you like to create?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="app_name" className="text-left font-bold">
              App Name
            </Label>
            <Input
              id="app_name"
              placeholder="Enter your App Name"
              value={newAgentData.app_name}
              onChange={handleChange}
              name="app_name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="app_id" className="text-left font-bold">
              Tweets ID
            </Label>
            <Input
              id="tweets_id"
              name="tweets_id"
              value={newAgentData.tweets_id}
              placeholder="Enter your App ID"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="app_desc" className="text-left font-bold">
              App Description
            </Label>
            <Textarea
              placeholder="Enter description of the app"
              rows={5}
              value={newAgentData.app_desc}
              onChange={handleChange}
              name="app_desc"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="secondary" onClick={handleCreate}>
            {loading ? (
              <Loading
                height="20px"
                size="8px"
                width="30px"
                alignItems="center"
              />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
