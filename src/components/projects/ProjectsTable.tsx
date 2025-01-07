import React from "react";
import { Project } from "@/types/Project";
import { Pencil, Trash2, CheckCircle, Star, Pause } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import ActionButton from "@/components/table/ActionButton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectActions } from "./hooks/useProjectActions";
import { useProjectModal } from "./hooks/useProjectModal";

interface ProjectsTableProps {
  projects: Project[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500 hover:bg-green-600";
    case "Inactive":
      return "bg-gray-500 hover:bg-gray-600";
    case "Halted":
      return "bg-orange-500 hover:bg-orange-600";
    case "Unapproved":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-blue-500 hover:bg-blue-600";
  }
};

const formatDuration = (startDate: string, endDate: string) => {
  try {
    const start = format(new Date(startDate), "MMM d, yyyy");
    const end = format(new Date(endDate), "MMM d, yyyy");
    return `${start} - ${end}`;
  } catch {
    return "Invalid dates";
  }
};

const formatAmount = (raised: number, goal: number) => {
  const percentage = (raised / goal) * 100;
  return `${raised.toLocaleString()} / ${goal.toLocaleString()} (${percentage.toFixed(
    1
  )}%)`;
};

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
    handleHaltProject,
  } = useProjectActions();

  const {
    isModalOpen,
    currentProject,
    setIsModalOpen,
    handleEditProject,
    handleModalSave,
  } = useProjectModal(handleUpdateProject);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className={
                project.isHighlighted ? "bg-yellow-100 hover:bg-yellow-200" : ""
              }
            >
              <TableCell>{project.id}</TableCell>
              <TableCell>
                {project.imageURLs && project.imageURLs[0] ? (
                  <div className="relative w-16 h-16">
                    <Image
                      src={project.imageURLs[0]}
                      alt={project.name}
                      className="rounded object-cover"
                      fill
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.country}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>
                {formatAmount(project.raisedAmount, project.goalAmount)}
              </TableCell>
              <TableCell>
                {formatDuration(project.startedAt || "", project.endedAt || "")}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <ActionButton
                    icon={Pencil}
                    disabled={project.status === "Inactive"}
                    onClick={() => handleEditProject(project)}
                    className="text-blue-600"
                  />
                  <ActionButton
                    icon={Trash2}
                    disabled={project.status === "Inactive"}
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600"
                  />
                  <ActionButton
                    icon={CheckCircle}
                    disabled={
                      project.status === "Active" ||
                      project.status === "Inactive"
                    }
                    onClick={() => handleApproveProject(project.id)}
                    className="text-green-600"
                  />
                  <ActionButton
                    icon={Star}
                    disabled={
                      project.isHighlighted || project.status === "Inactive"
                    }
                    onClick={() => handleHighlightProject(project.id)}
                    className="text-yellow-600"
                  />
                  <ActionButton
                    icon={Pause}
                    disabled={
                      project.status === "Halted" ||
                      project.status === "Inactive"
                    }
                    onClick={() => handleHaltProject(project.id)}
                    className="text-orange-600"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProjectModal
        project={currentProject}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleModalSave}
        onApprove={handleApproveProject}
      />
    </>
  );
};

export default ProjectsTable;
