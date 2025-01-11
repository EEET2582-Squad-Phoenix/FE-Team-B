import React, { useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { fetchProjects } from "@/lib/features/projects/projectsSlice";
import { useDispatch } from "react-redux";

interface ProjectsTableProps {
  projects: Project[];
  // currentPage: number;
  // totalPages: number;
  // onPageChange: (page: number) => void;
}

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
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
    isHaltModalOpen,
    setIsHaltModalOpen,
    selectedProject,
    openHaltModal,
    handleHaltProject,
    // handleResumeProject,
  } = useHaltProjectModal();

  // useEffect(() => {
  //   dispatch(fetchProjects({ currentPage, totalPages }) as any);
  // }, [currentPage, dispatch]);

  // // const handlePageChange = (page: number) => {
  // //   setCurrentPage(page);
  // // };

  // // Generate page numbers for pagination
  // const getPageNumbers = () => {
  //   const pages = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // };

  return (
    <>
      <Table className="max-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Scope</TableHead>
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
                {project.category.map(formatDisplayText).join(", ")}
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
                    <ActionButton
                      icon={ArchiveRestore}
                      // onClick={() => handleRestoreProject(project.id)}
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
                        // disabled={project.status !== "INACTIVATED"}
                        onClick={() => handleEditProject(project)}
                        // onClick={() => handleDeactivateProject(project.id)}
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

      {/* <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}

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
        // onResume={handleResumeProject}
      />
    </>
  );
};

export default ProjectsTable;
