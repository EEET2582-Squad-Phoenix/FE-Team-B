import { useDispatch } from "react-redux";
import {
  deleteProject,
  updateProject,
  highlightProject,
  approveProject,
  haltProject,
} from "@/lib/features/projects/projectsSlice";
import { Project } from "@/types/Project";

export const useProjectActions = () => {
  const dispatch = useDispatch();

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

  const handleHaltProject = (id: string) => {
    dispatch(haltProject(id));
  };

  return {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
    handleHaltProject,
  };
};
