import React, { useState } from "react";
import { Project } from "@/types/Project";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Star,
  Play,
  Pause,
  ArchiveRestore,
  Archive,
  Globe,
  MapPin,
} from "lucide-react";
import { ProjectModal } from "./ProjectModal";
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
import {
  formatAmount,
  formatDisplayText,
  formatDuration,
  getStatusColor,
} from "@/utils/projects/formatValues";
import { HaltProjectModal } from "./HaltProjectModal";
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
    // handleDeactivateProject,
    //handleRestoreProject
  } = useProjectActions();

  const {
    isModalOpen,
    currentProject,
    setIsModalOpen,
    handleEditProject,
    handleModalSave,
  } = useProjectModal(handleUpdateProject);

  const {
    isHaltModalOpen,
    setIsHaltModalOpen,
    selectedProject,
    openHaltModal,
    handleHaltProject,
    handleResumeProject,
  } = useHaltProjectModal();

  const [projectCount, setProjectCount] = useState(projects.length);

  return (
    <>
      <div className="text-xl font-bold mb-4">
        Total Projects: {projectCount}
      </div>
      {/* // button to increase project count */}
      <button onClick={() => setProjectCount(projectCount + 1)}>
        Add Project
      </button>
      <Table className="max-w-full">
        <TableHeader>
          <TableRow>
            <TableHead id="id-column">ID</TableHead>
            <TableHead id="thumbnail-column">Thumbnail</TableHead>
            <TableHead id="name-column">Name</TableHead>
            <TableHead id="country-column">Country</TableHead>
            <TableHead id="scope-column">Scope</TableHead>
            <TableHead id="category-column">Category</TableHead>
            <TableHead id="status-column">Status</TableHead>
            <TableHead id="amount-column">Amount</TableHead>
            <TableHead id="duration-column">Duration</TableHead>
            <TableHead id="actions-column">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, i) => (
            <TableRow
              key={i}
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
                      width={64}
                      height={64}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </TableCell>
              <TableCell>{formatDisplayText(project.name)}</TableCell>
              <TableCell>{formatDisplayText(project.country)}</TableCell>
              <TableCell>{project.isGlobal ? <Globe /> : <MapPin />}</TableCell>
              <TableCell>
                {project.category
                  ? project.category.map(formatDisplayText).join(", ")
                  : "N/A"}
              </TableCell>
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
                    <>
                      <ActionButton
                        icon={ArchiveRestore}
                        // onClick={() => handleRestoreProject(project.id)}
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-green-600"
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600"
                      />
                    </>
                  ) : (
                    <>
                      <ActionButton
                        icon={Pencil}
                        onClick={() => handleEditProject(project)}
                        className="text-blue-600"
                      />
                      <ActionButton
                        icon={CheckCircle}
                        disabled={project.status !== "UNAPPROVED"}
                        onClick={() => handleApproveProject(project.id)}
                        className="text-green-600"
                      />
                      <ActionButton
                        icon={Star}
                        disabled={project.status !== "ACTIVE"}
                        onClick={() => handleHighlightProject(project.id)}
                        className={
                          project.isHighlighted
                            ? project.status !== "ACTIVE"
                              ? "text-gray-400" 
                              : "text-yellow-600" 
                            : project.status !== "ACTIVE"
                            ? "text-gray-400" 
                            : "text-gray-600" 
                        }
                      />
                      <ActionButton
                        icon={project.status === "HALTED" ? Play : Pause}
                        disabled={
                          !["ACTIVE", "HALTED"].includes(project.status)
                        }
                        onClick={() => openHaltModal(project)}
                        className={
                          project.status === "HALTED"
                            ? "text-green-600"
                            : "text-orange-600"
                        }
                      />
                      <ActionButton
                        icon={Archive}
                        onClick={() => handleEditProject(project)}
                        className="text-gray-600"
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600"
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
        project={selectedProject}
        open={isHaltModalOpen}
        onOpenChange={setIsHaltModalOpen}
        onHalt={handleHaltProject}
        onResume={handleResumeProject}
      />
    </>
  );
};

export default ProjectsTable;
