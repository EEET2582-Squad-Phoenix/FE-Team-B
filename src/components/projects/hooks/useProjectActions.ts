import { useDispatch } from "react-redux";
import {
  deleteProject,
  updateProject,
  highlightProject,
  approveProject,
  haltProject,
} from "@/lib/features/projects/projectsSlice";
import { Project } from "@/types/Project";
import { useCallback } from "react";
import { AppDispatch } from "@/lib/store";

export const useProjectActions = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id));
  };

  const handleUpdateProject = (updatedProject: Project) => {
    dispatch(updateProject(updatedProject));
  };

  const handleApproveProject = (id: string) => {
    dispatch(approveProject(id));
  };

  const handleHighlightProject = (id: string) => {
    dispatch(highlightProject(id));
  };

  const handleHaltProject = useCallback(
    async (projectId: string, adminReason: string, charityReason: string) => {
      try {
        await dispatch(
          haltProject({ projectId, adminReason, charityReason })
        );
      } catch (error) {
        console.error("Error halting project:", error);
        alert(`Error halting project: ${error}`);
      }
    },
    [dispatch]
  );

  return {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
    handleHaltProject,
  };
};
