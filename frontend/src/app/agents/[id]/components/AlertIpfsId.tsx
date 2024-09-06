import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import AppContext from "@/contexts/AppContext";

export function AlertIpfsId() {
  const { fakeTweetIPFSID, setFakeTweetIPFSIDHandler } = useContext(AppContext);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          {fakeTweetIPFSID != "" ? "IPFS ID Saved" : "First Save IPFS ID"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to save this IPFS ID?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone once you save the IPFS ID to the
            database. Are you sure you want to continue?
          </AlertDialogDescription>
          <Input
            placeholder=" Enter IPFS ID"
            className="mt-2"
            value={fakeTweetIPFSID}
            onChange={(e) => setFakeTweetIPFSIDHandler(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
