import React from "react";
import { Project } from "@/types/Project";
import { Pencil, Trash2, CheckCircle, Star, Pause } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import { HaltProjectModal } from "./HaltProjectModal";
import ActionButton from "@/components/table/ActionButton";

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
    reason,
    setReason,
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
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>goalAmount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className={
                project.isHighlighted ? "bg-yellow-200 hover:bg-yellow-300" : ""
              }
            >
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.country}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>{project.goalAmount}</TableCell>
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
                    onClick={() => openHaltModal(project.id)}
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
