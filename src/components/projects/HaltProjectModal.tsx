// "@/pages/projects/HaltProjectModal.tsx"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "@/types/Project";

interface HaltProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onHalt: (
    id: string,
    donorMessage: string,
    charityMessage: string
  ) => void;
  onResume: (
    id: string,
    donorMessage: string,
    charityMessage: string
  ) => void;
}

export function HaltProjectModal({
  open,
  onOpenChange,
  project,
  onHalt,
  onResume,
}: HaltProjectModalProps) {
  const [donorMessage, setDonorMessage] = useState(
    project?.haltedMessage?.donorMessage || ""
  );
  const [charityMessage, setCharityMessage] = useState(
    project?.haltedMessage?.charityMessage || ""
  );

  const isHalted = project?.status === "HALTED";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      const handler = isHalted ? onResume : onHalt;
      handler(project.id, donorMessage, charityMessage);
      setDonorMessage("");
      setCharityMessage("");
      onOpenChange(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {isHalted ? "Resume Project" : "Halt Project"}
          </DialogTitle>
          <DialogDescription>
            Project: {project.name}
            <br />
            ID: {project.id}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="donorMessage">Message to donors</Label>
              <Input
                id="donorMessage"
                placeholder="Enter message to donors"
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="charityMessage">Message to charities</Label>
              <Input
                id="charityMessage"
                placeholder="Enter message to charities"
                value={charityMessage}
                onChange={(e) => setCharityMessage(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isHalted ? "Resume Project" : "Halt Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
