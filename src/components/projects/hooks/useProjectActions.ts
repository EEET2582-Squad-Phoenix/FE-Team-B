import { useDispatch } from "react-redux";
import {
  deleteProject,
  updateProject,
  approveProject,
  fetchProjects,
  toggleHighlightProject, // Import fetchProjects
} from "@/lib/features/projects/projectsSlice";
import { Project } from "@/types/Project";
import { AppDispatch } from "@/lib/store";

export const useProjectActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id)).then(() => dispatch(fetchProjects()));
  };

  const handleUpdateProject = (updatedProject: Project) => {
    dispatch(updateProject(updatedProject)).then(() =>
      dispatch(fetchProjects())
    );
  };

  const handleApproveProject = (id: string) => {
    dispatch(approveProject(id)).then(() => dispatch(fetchProjects()));
  };

  const handleHighlightProject = (id: string) => {
    dispatch(toggleHighlightProject(id));
  };

  return {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
  };
};
