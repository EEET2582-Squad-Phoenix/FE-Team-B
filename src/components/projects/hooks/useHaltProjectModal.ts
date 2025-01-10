import { useState } from "react";
import { HaltProjectPayload, Project } from "@/types/Project";
import { useAppDispatch } from "@/lib/hooks";
import { haltProject } from "@/lib/features/projects/projectsSlice";

export const useHaltProjectModal = () => {
  const dispatch = useAppDispatch();
  const [isHaltModalOpen, setIsHaltModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openHaltModal = (project: Project) => {
    setSelectedProject(project);
    setIsHaltModalOpen(true);
  };

  const handleHaltProject = async (
    projectId: string,
    donorMessage?: string,
    charityMessage?: string
  ) => {
    try {
      const payload: HaltProjectPayload = {
        projectId,
        donorMessage,
        charityMessage,
      };
      await dispatch(haltProject(payload)).unwrap();
    } catch (error) {
      console.error("Failed to halt project:", error);
    }
  };

  return {
    isHaltModalOpen,
    setIsHaltModalOpen,
    selectedProject,
    openHaltModal,
    handleHaltProject,
  };
};
