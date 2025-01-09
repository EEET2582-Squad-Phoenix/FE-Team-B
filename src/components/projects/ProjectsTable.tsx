import React from "react";
import { Project } from "@/types/Project";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Star,
  Pause,
  PowerOff,
  Play,
} from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import { HaltProjectModal } from "./HaltProjectModal";
import ActionButton from "@/components/table/ActionButton";
import { Badge } from "@/components/ui/badge";
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
import { formatAmount, formatDuration } from "@/utils/projects/formatValues";
import { getStatusColor } from "@/utils/projects/getCssValues";
import { useHaltProjectModal } from "./hooks/useHaltProjectModal";

interface ProjectsTableProps {
  projects: Project[];
}

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
    handleHaltProject,
    // handleDeactivateProject,
    // handleResumeProject,
  } = useProjectActions();

  const {
    isModalOpen,
    currentProject,
    setIsModalOpen,
    handleEditProject,
    handleModalSave,
  } = useProjectModal(handleUpdateProject);

  const {
    isOpen: isHaltModalOpen,
    selectedProject,
    // reason,
    // setReason,
    openModal: openHaltModal,
    closeModal: closeHaltModal,
  } = useHaltProjectModal();

  const handleHaltProjectSubmit = () => {
    if (selectedProject) {
      handleHaltProject(selectedProject);
      closeHaltModal();
    }
  };

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
                {formatDuration(project.startDate || "", project.endDate || "")}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  {project.status === "INACTIVATED" ? (
                    <ActionButton
                      icon={Play}
                      // onClick={() => handleResumeProject(project.id)}
                      onClick={() => handleEditProject(project)}
                      className="text-green-600"
                    />
                  ) : (
                    <>
                      <ActionButton
                        icon={Pencil}
                        // disabled={project.status === "INACTIVATED"}
                        onClick={() => handleEditProject(project)}
                        className="text-blue-600"
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600"
                      />
                      <ActionButton
                        icon={CheckCircle}
                        disabled={project.status !== "UNAPPROVED"}
                        onClick={() => handleApproveProject(project.id)}
                        className="text-green-600"
                      />
                      <ActionButton
                        icon={Star}
                        disabled={
                          project.isHighlighted || project.status !== "ACTIVE"
                        }
                        onClick={() => handleHighlightProject(project.id)}
                        className="text-yellow-600"
                      />
                      <ActionButton
                        icon={Pause}
                        disabled={project.status !== "ACTIVE"}
                        onClick={() => openHaltModal(project.id)}
                        className="text-orange-600"
                      />
                      <ActionButton
                        icon={PowerOff}
                        // disabled={project.status !== "INACTIVATED"}
                        onClick={() => handleEditProject(project)}
                        // onClick={() => handleDeactivateProject(project.id)}
                        className="text-gray-600"
                      />
                    </>
                  )}
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

      <HaltProjectModal
        projectName={selectedProject || ""}
        open={isHaltModalOpen}
        onOpenChange={closeHaltModal}
        onSubmit={handleHaltProjectSubmit}
      />
    </>
  );
};

export default ProjectsTable;
