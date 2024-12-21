import { useDispatch } from 'react-redux';
import { deleteProject, updateProject } from '@/lib/features/projects/projectsSlice';
import { Project } from '@/types/Project';

export const useProjectActions = () => {
  const dispatch = useDispatch();

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id));
  };

  const handleUpdateProject = (updatedProject: Project) => {
    dispatch(updateProject(updatedProject));
  };

  const handleApproveProject = (id: string) => {
    console.log("Approve", id);
  };

  const handleHighlightProject = (id: string) => {
    console.log("Highlight", id);
  };

  const handleHaltProject = (id: string) => {
    console.log("Halt", id);
  };

  return {
    handleDeleteProject,
    handleUpdateProject,
    handleApproveProject,
    handleHighlightProject,
    handleHaltProject,
  };
};