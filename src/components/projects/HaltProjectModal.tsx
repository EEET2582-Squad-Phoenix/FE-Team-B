import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface HaltProjectModalProps {
    projectName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (reason: string) => void;
}

export function HaltProjectModal({
    projectName,
    open,
    onOpenChange,
    onSubmit,
  }: HaltProjectModalProps) {
    const [reason, setReason] = useState("");
    
    useEffect(() => {
        if (!open) {
          setReason("");
        }
      }, [open]);

    const handleSubmit = () => {
      if (!reason.trim()) {
        alert("Reason is required.");
        return;
      }
      onSubmit(reason);
    };
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Halt Project</DialogTitle>
            <DialogDescription>
              Provide a reason for halting the project "{projectName}".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason *
              </Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="col-span-3"
                placeholder="Enter reason"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
