import { useDispatch } from "react-redux";
import {
  deleteProject,
  updateProject,
  highlightProject,
  approveProject,
} from "@/lib/features/projects/projectsSlice";
import { Project } from "@/types/Project";
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

  return {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
  };
};
