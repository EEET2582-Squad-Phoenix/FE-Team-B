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
import {
  Project,
  ProjectCategories,
  ProjectCategory,
  ProjectStatus,
} from "@/types/Project";
import { CheckCircle } from "lucide-react";
import { CountryDropdown } from "react-country-region-selector";

interface ProjectModalProps {
  project?: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: Project) => void;
  onApprove: (id: string) => void;
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
  onSave,
  onApprove,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<Project>({
    id: project?.id || "",
    name: project?.name || "",
    country: project?.country || "",
    category: project?.category || "Food",
    goal: project?.goal || 0,
    status: project?.status || "Approved",
    isHighlighted: project?.isHighlighted || false,
  });

  // Update form data when project or open state changes
  useEffect(() => {
    setFormData({
      id: project?.id || "",
      name: project?.name || "",
      country: project?.country || "",
      category: project?.category || "Food",
      goal: project?.goal || 0,
      status: project?.status || "Approved",
      isHighlighted: project?.isHighlighted || false,
    });
  }, [project, open]);

  const handleChange = <K extends keyof Project>(
    field: K,
    value: K extends "category"
      ? ProjectCategory
      : K extends "status"
      ? ProjectStatus
      : K extends "goal" | "isHighlighted"
      ? number | boolean
      : string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validation and saving
  const handleSave = () => {
    // Validate required fields
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Project name is required");
    }

    if (formData.goal < 0) {
      errors.push("Goal must be a non-negative number");
    }

    // Display all validation errors
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update the project details."
              : "Enter the details for your new project."}{" "}
            Click save when you&apos;re done.
          </DialogDescription>
          {project?.status === "Pending" && (
            <div className="mt-2">
              <Button
                onClick={() => onApprove(project.id)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Project
              </Button>
            </div>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* ID field (optional, disabled for existing projects) */}
          {project && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => handleChange("id", e.target.value)}
                className="col-span-3 bg-gray-100 border-gray-300 "
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
              className="col-span-3 bg-gray-100 border-gray-300 "
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
              className="col-span-3 bg-gray-100 border-gray-300 "
              placeholder="Enter project country"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Country
            </Label>
            <CountryDropdown />
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
              <SelectTrigger className="col-span-3 bg-gray-100 border-gray-300 ">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {ProjectCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
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
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  handleChange("goal", isNaN(value) ? 0 : value);
                }}
                className="w-full bg-gray-100 border-gray-300 "
                placeholder="Enter project goal"
                min={0}
                step={1}
              />
            </div>
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
                className="h-4 w-4 mr-2"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {project ? "Update Project" : "Save Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
