import { useState } from 'react';
import { Project } from '@/types/Project';

export const useProjectModal = (onUpdate: (project: Project) => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );

  const openModal = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(undefined);
  };

  const handleEditProject = (project: Project) => {
    openModal(project);
  };

  const handleModalSave = (updatedProject: Project) => {
    onUpdate(updatedProject);
    closeModal();
  };

  return {
    isModalOpen,
    currentProject,
    setIsModalOpen,
    handleEditProject,
    handleModalSave,
  };
};