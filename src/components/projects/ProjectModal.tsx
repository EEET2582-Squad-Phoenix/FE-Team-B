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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Project,
  ProjectCategories,
  ProjectCategoryType,
  ProjectStatusType,
} from "@/types/Project";
import { CalendarIcon, CheckCircle, X } from "lucide-react";
import { CountryDropdown } from "react-country-region-selector";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import FileUpload from "../common/FileUpload";

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
    imageURLs: project?.imageURLs || [],
    videoURLs: project?.videoURLs || [],
    country: project?.country || "",
    goalAmount: project?.goalAmount || 0,
    raisedAmount: project?.raisedAmount || 0,
    categories: project?.categories || [],
    isGlobal: project?.isGlobal || false,
    status: project?.status || "ACTIVE",
    haltedMessage: project?.haltedMessage || undefined,
    isHighlighted: project?.isHighlighted || false,
    fundStatus: project?.fundStatus || "ONGOING",
    createdAt: project?.createdAt
      ? new Date(project.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: project?.updatedAt
      ? new Date(project.updatedAt).toISOString()
      : new Date().toISOString(),
    endDate: project?.endDate
      ? new Date(project.endDate).toISOString()
      : new Date().toISOString(),
    charityID: project?.charityID || "043717fa", // static charityID while implementing user module
    startDate: project?.startDate
      ? new Date(project.startDate).toISOString()
      : new Date().toISOString(),
    donorList: project?.donorList || [],
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
    value: K extends "categories"
      ? ProjectCategoryType
      : K extends "status"
      ? ProjectStatusType
      : K extends "goalAmount" | "raisedAmount" | "isGlobal"
      ? number | boolean
      : K extends "imageURLs" | "videoURLs"
      ? string[]
      : K extends "createdAt" | "updatedAt" | "startDate" | "endDate"
      ? string | undefined
      : string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagesChange = (base64Files: string[]) => {
    handleChange("imageURLs", base64Files);
  };

  const handleVideosChange = (base64Files: string[]) => {
    handleChange("videoURLs", base64Files);
  };

  const handleSave = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Project name is required");
    }
    if (!formData.country.trim()) {
      errors.push("Country is required");
    }

    if (formData.categories.length === 0) {
      errors.push("At least one categories must be selected");
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
    if (!formData.startDate) {
      errors.push("Start date is required");
    }

    if (!formData.endDate) {
      errors.push("End date is required");
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      errors.push("End date must be after the start date");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const updatedFormData = {
      ...formData,
      country: formData.country.toUpperCase(), // to match validation in BE
    };

    onSave(updatedFormData);
  };

  const handleCategorySelect = (selectedCategory: ProjectCategoryType) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(selectedCategory)
        ? prev.categories.filter((cat) => cat !== selectedCategory)
        : [...prev.categories, selectedCategory],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update the project details."
              : "Enter the details for your new project."}
          </DialogDescription>
          {project?.status === "UNAPPROVED" && (
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

        <div className="flex-1 overflow-y-auto pr-6">
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

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Media</Label>
              <div className="col-span-3">
                <FileUpload
                  onImagesChange={handleImagesChange}
                  onVideosChange={handleVideosChange}
                  maxImages={15}
                  maxVideos={4}
                />
              </div>
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

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="categories" className="text-right pt-2">
                Categories *
              </Label>
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.categories.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
                    >
                      {cat}
                      <button
                        onClick={() => handleCategorySelect(cat)}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Select
                  onValueChange={(value) =>
                    handleCategorySelect(value as ProjectCategoryType)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ProjectCategories.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          disabled={formData.categories.includes(cat)}
                        >
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
              <Label className="text-right">Start Date *</Label>
              <div className="col-span-3 flex flex-col gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full pl-3 text-left font-normal"
                    >
                      {formData.startDate ? (
                        format(new Date(formData.startDate), "PPP")
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
                        formData.startDate
                          ? new Date(formData.startDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        handleChange("startDate", date?.toISOString() || "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">End Date *</Label> {/* Added * */}
              <div className="col-span-3 flex flex-col gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full pl-3 text-left font-normal"
                    >
                      {formData.endDate ? (
                        format(new Date(formData.endDate), "PPP")
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
                        formData.endDate
                          ? new Date(formData.endDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        handleChange("endDate", date?.toISOString() || "")
                      }
                      initialFocus
                      fromDate={
                        formData.startDate
                          ? new Date(formData.startDate)
                          : undefined
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Global</Label>
              <input
                type="checkbox"
                checked={formData.isGlobal}
                onChange={(e) => handleChange("isGlobal", e.target.checked)}
                className="col-span-3 text-left"
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
