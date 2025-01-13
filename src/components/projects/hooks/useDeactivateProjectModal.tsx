import { useState } from "react";
import { Project } from "@/types/Project";
import { useAppDispatch } from "@/lib/hooks";
import {
  deactivateProject,
  fetchProjects,
} from "@/lib/features/projects/projectsSlice"; // You'll need to create this action
import { toast } from "react-toastify";

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
    dispatch(deactivateProject({ projectId, deletionReason }))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        setIsDeactivateModalOpen(false);
        toast.success("Project deactivated successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to deactivate project: ${error.message}`);
      });
  };

  return {
    isDeactivateModalOpen,
    setIsDeactivateModalOpen,
    selectedDeactivatedProject,
    openDeactivateModal,
    handleDeactivateProject,
  };
};
