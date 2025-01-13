// "@/pages/projects/hooks/useHaltProjectModal.ts"
import { useState } from "react";
import { Project } from "@/types/Project";
import { useAppDispatch } from "@/lib/hooks";
import {
  fetchProjects,
  toggleHaltProject,
} from "@/lib/features/projects/projectsSlice";

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
    try {
      await dispatch(
        toggleHaltProject({ projectId, donorMessage, charityMessage })
      ).unwrap();
      dispatch(fetchProjects());
      setIsHaltModalOpen(false);
    } catch (error) {
      console.error("Failed to halt project:", error);
    }
  };

  const handleResumeProject = async (
    projectId: string,
    donorMessage: string,
    charityMessage: string
  ) => {
    try {
      await dispatch(
        toggleHaltProject({ projectId, donorMessage, charityMessage })
      ).unwrap();
      dispatch(fetchProjects());
      setIsHaltModalOpen(false);
    } catch (error) {
      console.error("Failed to resume project:", error);
    }
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
