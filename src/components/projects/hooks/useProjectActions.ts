import { useDispatch } from "react-redux";
import {
  deleteProject,
  updateProject,
  approveProject,
  fetchProjects,
  toggleHighlightProject,
  restoreProject,
} from "@/lib/features/projects/projectsSlice";
import { Project } from "@/types/Project";
import { AppDispatch } from "@/lib/store";
import { toast } from "react-toastify";

export const useProjectActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        toast.success("Project deleted successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleUpdateProject = (updatedProject: Project) => {
    dispatch(updateProject(updatedProject))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        toast.success("Project updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleApproveProject = (id: string) => {
    dispatch(approveProject(id))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        toast.success("Project approved successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleRestoreProject = (projectId: string) => {
    dispatch(restoreProject({ projectId }))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        toast.success("Project restored successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleHighlightProject = (id: string) => {
    dispatch(toggleHighlightProject(id))
      .unwrap()
      .then(() => {
        dispatch(fetchProjects());
        toast.success("Project highlighted successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
    handleRestoreProject,
  };
};
