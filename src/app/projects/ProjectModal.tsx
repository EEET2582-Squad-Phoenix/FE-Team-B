import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project, ProjectCategory, ProjectStatus } from "@/types/Project";

interface ProjectModalProps {
  project?: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: Project) => void;
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
  onSave,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<Project>({
    id: project?.id || "",
    name: project?.name || "",
    country: project?.country || "",
    category: project?.category || "Food",
    goal: project?.goal || "",
    status: project?.status || "pending",
    isHighlighted: project?.isHighlighted || false,
  });

  useEffect(() => {
    setFormData({
      id: project?.id || "",
      name: project?.name || "",
      country: project?.country || "",
      category: project?.category || "Food",
      goal: project?.goal || "",
      status: project?.status || "pending",
      isHighlighted: project?.isHighlighted || false,
    });
  }, [project, open]);

  const handleChange = (
    field: keyof Project,
    value: string | boolean | ProjectCategory | ProjectStatus | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name) {
      alert("Project name is required");
      return;
    }

    const goalNumber = Number(formData.goal);
    if (isNaN(goalNumber) || goalNumber < 0) {
      alert("Goal must be a valid positive number");
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update the project details."
              : "Enter the details for your new project."}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* ID field (optional, disabled for new projects) */}
          {project && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => handleChange("id", e.target.value)}
                className="col-span-3"
                disabled
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="col-span-3"
              placeholder="Enter project country"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                handleChange("category", value as ProjectCategory)
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
            <div className="col-span-3">
              <Input
                id="goal"
                type="number"
                value={formData.goal}
                onChange={(e) =>
                  handleChange("goal", parseFloat(e.target.value))
                }
                className="w-full"
                placeholder="Enter project goal"
                min={0}
                step={1}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleChange("status", value as ProjectStatus)
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="halted">Halted</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isHighlighted" className="text-right">
              Highlighted
            </Label>
            <div className="col-span-3 flex items-center">
              <input
                id="isHighlighted"
                type="checkbox"
                checked={formData.isHighlighted}
                onChange={(e) =>
                  handleChange("isHighlighted", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 mr-2"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>
            {project ? "Update Project" : "Save Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
