import { useState } from "react";

export function useHaltProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [donorReason, setDonorReason] = useState("");
  const [charityReason, setCharityReason] = useState("");

  const openModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProjectId(null);
    setDonorReason("");
    setCharityReason("");
  };

  return {
    isOpen,
    selectedProjectId,
    donorReason,
    charityReason,
    setDonorReason,
    setCharityReason,
    openModal,
    closeModal,
  };
}