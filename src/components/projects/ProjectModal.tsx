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
import { CalendarIcon, CheckCircle } from "lucide-react";
import { CountryDropdown } from "react-country-region-selector";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";

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
    description: project?.description || "",
    thumbnailURL: project?.thumbnailURL || "",
    imageURLs: project?.imageURLs || [],
    videoURLs: project?.videoURLs || [],
    country: project?.country || "",
    goalAmount: project?.goalAmount || 0,
    raisedAmount: project?.raisedAmount || 0,
    isGlobal: project?.isGlobal || false,
    category: project?.category || "Food",
    status: project?.status || "Active",
    haltedReason: Array.isArray(project?.haltedReason)
      ? project.haltedReason
      : [],
    isHighlighted: project?.isHighlighted || false,
    isFullyFunded: project?.isFullyFunded || false,
    createdAt: project?.createdAt
      ? new Date(project.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: project?.updatedAt
      ? new Date(project.updatedAt).toISOString()
      : new Date().toISOString(),
    endedAt: project?.endedAt
      ? new Date(project.endedAt).toISOString()
      : new Date().toISOString(),
    startedAt: project?.startedAt
      ? new Date(project.startedAt).toISOString()
      : new Date().toISOString(),
  });

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
      });
    }
  }, [project, open]);

  const handleChange = <K extends keyof Project>(
    field: K,
    value: K extends "category"
      ? ProjectCategory
      : K extends "status"
      ? ProjectStatus
      : K extends
          | "goalAmount"
          | "raisedAmount"
          | "isHighlighted"
          | "isGlobal"
          | "isFullyFunded"
      ? number | boolean
      : K extends "imageURLs" | "videoURLs"
      ? string[]
      : K extends "createdAt" | "updatedAt" | "endedAt" | "duration"
      ? Date | undefined
      : string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Project name is required");
    }
    if (!formData.country.trim()) {
      errors.push("Country is required");
    }
    if (!formData.category) {
      errors.push("Category is required");
    }
    if (formData.goalAmount <= 0) {
      errors.push("Goal amount must be greater than 0");
    }
    if (formData.imageURLs && formData.imageURLs.length > 15) {
      errors.push("Maximum 15 images allowed");
    }
    if (formData.videoURLs && formData.videoURLs.length > 4) {
      errors.push("Maximum 4 videos allowed");
    }

    if (!formData.startedAt) {
      errors.push("Start date is required");
    }

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
              : "Enter the details for your new project."}
          </DialogDescription>
          {project?.status === "Unapproved" && (
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
          {project && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input
                id="id"
                value={formData.id}
                className="col-span-3 bg-gray-100"
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
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country *
            </Label>
            <div className="col-span-3">
              <CountryDropdown
                value={formData.country}
                onChange={(val) => handleChange("country", val)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category *
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
                {ProjectCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goalAmount" className="text-right">
              Goal *
            </Label>
            <Input
              id="goalAmount"
              type="number"
              value={formData.goalAmount}
              onChange={(e) =>
                handleChange("goalAmount", Number(e.target.value))
              }
              className="col-span-3"
              min={0}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Start Date</Label>
            <div className="col-span-3 flex flex-col gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full pl-3 text-left font-normal mt-2"
                  >
                    {formData.startedAt ? (
                      format(new Date(formData.startedAt), "PPP")
                    ) : (
                      <span>Pick a start date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.startedAt
                        ? new Date(formData.startedAt)
                        : undefined
                    }
                    onSelect={(date) =>
                      handleChange("startedAt", date?.toISOString() || "")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">End Date</Label>
            <div className="col-span-3 flex flex-col gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full pl-3 text-left font-normal mt-2"
                  >
                    {formData.endedAt ? (
                      format(new Date(formData.endedAt), "PPP")
                    ) : (
                      <span>Pick an end date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.endedAt ? new Date(formData.endedAt) : undefined
                    }
                    onSelect={(date) => handleChange("endedAt", date)}
                    initialFocus
                    fromDate={
                      formData.startedAt
                        ? new Date(formData.startedAt)
                        : undefined
                    }
                  />
                </PopoverContent>
              </Popover>
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isGlobal" className="text-right">
              Global
            </Label>
            <div className="col-span-3 flex items-center">
              <input
                id="isGlobal"
                type="checkbox"
                checked={formData.isGlobal}
                onChange={(e) => handleChange("isGlobal", e.target.checked)}
                className="h-4 w-4 mr-2"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {project ? "Update Project" : "Save Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
