import { ProjectProgress, ProjectProgressType } from "@/types/Project";
import React from "react";

interface ProgressFilterProps {
  onProgressChange: (Progress: ProjectProgressType[]) => void;
  selectedProgress: ProjectProgressType[];
}

const ProgressFilter: React.FC<ProgressFilterProps> = ({
  onProgressChange,
  selectedProgress,
}) => {
  const handleCheckboxChange = (progress: ProjectProgressType) => {
    const updatedProgress = selectedProgress.includes(progress)
      ? selectedProgress.filter((p) => p !== progress)
      : [...selectedProgress, progress];
    onProgressChange(updatedProgress);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Donation Progress</h3>
      <div className="space-y-2">
        {ProjectProgress.map((progress) => (
          <label key={progress} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedProgress.includes(progress as ProjectProgressType)} 
              onChange={() => handleCheckboxChange(progress as ProjectProgressType)} 
            />
            <span>{progress}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProgressFilter;
