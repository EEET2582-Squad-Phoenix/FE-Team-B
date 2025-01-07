import { useState } from "react";

export function useHaltProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const openModal = (projectName: string) => {
    setSelectedProject(projectName);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProject(null);
    setReason("");
  };

  return {
    isOpen,
    selectedProject,
    reason,
    setReason,
    openModal,
    closeModal,
  };
}
