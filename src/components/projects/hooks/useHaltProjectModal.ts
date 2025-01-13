// "@/pages/projects/hooks/useHaltProjectModal.ts"
import { useState } from "react";
import { Project } from "@/types/Project";
import { useAppDispatch } from "@/lib/hooks";
import {
  fetchProjects,
  toggleHaltProject,
} from "@/lib/features/projects/projectsSlice";
import { toast } from "react-toastify";

export const useHaltProjectModal = () => {
  const dispatch = useAppDispatch();
  const [isHaltModalOpen, setIsHaltModalOpen] = useState(false);
  const [selectedHaltProject, setSelectedProject] = useState<Project | null>(
    null
  );

  const openHaltModal = (project: Project) => {
    setSelectedProject(project);
    setIsHaltModalOpen(true);
  };

  const handleHaltProject = async (
    projectId: string,
    donorMessage: string,
    charityMessage: string
  ) => {
    dispatch(toggleHaltProject({ projectId, donorMessage, charityMessage }))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        setIsHaltModalOpen(false);
        toast.success("Project halted successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to halt project: ${error.message}`);
      });
  };

  const handleResumeProject = async (
    projectId: string,
    donorMessage: string,
    charityMessage: string
  ) => {
    dispatch(toggleHaltProject({ projectId, donorMessage, charityMessage }))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        setIsHaltModalOpen(false);
        toast.success("Project resumed successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to resume project: ${error.message}`);
      });
  };

  return {
    isHaltModalOpen,
    setIsHaltModalOpen,
    selectedHaltProject,
    openHaltModal,
    handleHaltProject,
    handleResumeProject,
  };
};
