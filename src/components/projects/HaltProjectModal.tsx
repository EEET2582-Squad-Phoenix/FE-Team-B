import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Project, HaltReason } from "@/types/Project";
import { useForm, SubmitHandler } from "react-hook-form";

interface HaltProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (projectId: string, haltedReason: HaltReason) => void;
  project?: Project;
}

export const HaltProjectModal: React.FC<HaltProjectModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  project,
}) => {
  const onSubmitHandler: SubmitHandler<HaltReason> = (data) => {
    if (project) {
      onSubmit(project.id, data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Halt Project</DialogTitle>
        <DialogDescription>
          Are you sure you want to halt this project? Please provide reasons
          below.
        </DialogDescription>
      </DialogHeader>
      <DialogContent className="max-w-3xl">
        {project && (
          <>
            <p>Project ID: {project.id}</p>
            <p>Project Name: {project.name}</p>
          </>
        )}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="adminReason">Admin Reason:</Label>
              <Textarea
                {...register("adminReason", { required: true, minLength: 10 })}
                id="adminReason"
                className="w-full"
              />
              {errors.adminReason?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm">
                  Admin reason is required.
                </p>
              )}
              {errors.adminReason?.type === "minLength" && (
                <p role="alert" className="text-red-500 text-sm">
                  Admin reason must be at least 10 characters long.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="charityReason">Charity Reason:</Label>
              <Textarea
                {...register("charityReason", {
                  required: true,
                  minLength: 10,
                })}
                id="charityReason"
                className="w-full"
              />
              {errors.charityReason?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm">
                  Charity reason is required.
                </p>
              )}
              {errors.charityReason?.type === "minLength" && (
                <p role="alert" className="text-red-500 text-sm">
                  Charity reason must be at least 10 characters long.
                </p>
              )}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="halt-project-form"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Halt Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
