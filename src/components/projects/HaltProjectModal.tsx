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
    projectId: string,
    donorMessage: string,
    charityMessage: string
  ) => void;
  onResume?: (projectId: string) => void;
}

export function HaltProjectModal({
  open,
  onOpenChange,
  project,
  onHalt,
  onResume,
}: HaltProjectModalProps) {
  const [donorMessage, setDonorMessage] = useState("");
  const [charityMessage, setCharityMessage] = useState("");

  const isHalted = project?.status === "HALTED";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      onHalt(project.id, donorMessage, charityMessage);
      setDonorMessage("");
      setCharityMessage("");
      onOpenChange(false);
    }
  };

  const handleResume = () => {
    if (project) {
      onResume?.(project.id);
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

        {!isHalted ? (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="donorMessage">Message to donors</Label>{" "}
                <Input
                  id="donorMessage"
                  placeholder="Enter message to donors"
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="charityMessage">Message to charities</Label>{" "}
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
              <Button type="submit" variant="destructive">
                Halt Project
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-4">
            <div className="grid gap-2 mb-4">
              <Label>Current Admin Reason</Label>
              <div className="text-sm text-gray-500">
                {project.haltedMessage?.donorMessage || "No reason provided"}
              </div>
            </div>
            <div className="grid gap-2 mb-4">
              <Label>Current Charity Reason</Label>
              <div className="text-sm text-gray-500">
                {project.haltedMessage?.charityMessage || "No reason provided"}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleResume}>Resume Project</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
