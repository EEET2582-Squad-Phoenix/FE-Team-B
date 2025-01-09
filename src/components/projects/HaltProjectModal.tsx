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
    adminReason?: string, // Made optional
    charityReason?: string // Made optional
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
  const [adminReason, setAdminReason] = useState("");
  const [charityReason, setCharityReason] = useState("");

  const isHalted = project?.status === "HALTED";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      onHalt(project.id, adminReason, charityReason);
      setAdminReason("");
      setCharityReason("");
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
                <Label htmlFor="adminReason">Admin Reason (Optional)</Label>{" "}
                {/* Added (Optional) */}
                <Input
                  id="adminReason"
                  placeholder="Enter admin reason for halting"
                  value={adminReason}
                  onChange={(e) => setAdminReason(e.target.value)}
                  className="col-span-3" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="charityReason">Charity Reason (Optional)</Label>{" "}
                <Input
                  id="charityReason"
                  placeholder="Enter charity reason for halting"
                  value={charityReason}
                  onChange={(e) => setCharityReason(e.target.value)}
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
                {project.haltedReason?.haltedReasonAdmin ||
                  "No reason provided"}
              </div>
            </div>
            <div className="grid gap-2 mb-4">
              <Label>Current Charity Reason</Label>
              <div className="text-sm text-gray-500">
                {project.haltedReason?.haltedReasonCharity ||
                  "No reason provided"}
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
