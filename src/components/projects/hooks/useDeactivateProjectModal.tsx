import { useState } from "react";
import { Project } from "@/types/Project";
import { useAppDispatch } from "@/lib/hooks";
import { deactivateProject } from "@/lib/features/projects/projectsSlice"; // You'll need to create this action

export const useDeactivateProjectModal = () => {
  const dispatch = useAppDispatch();
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedDeactivatedProject, setSelectedProject] =
    useState<Project | null>(null);

  const openDeactivateModal = (project: Project) => {
    setSelectedProject(project);
    setIsDeactivateModalOpen(true);
  };

  const handleDeactivateProject = async (
    projectId: string,
    deletionReason: string
  ) => {
    try {
      await dispatch(deactivateProject({ projectId, deletionReason }));
      setIsDeactivateModalOpen(false);
    } catch (error) {
      console.error("Failed to deactivate project:", error);
    }
  };

  return {
    isDeactivateModalOpen,
    setIsDeactivateModalOpen,
    selectedDeactivatedProject,
    openDeactivateModal,
    handleDeactivateProject,
  };
};
