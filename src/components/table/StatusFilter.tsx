import React from "react";
import { ProjectStatus } from "@/types/Project";

interface StatusFilterProps {
  onStatusChange: (status: ProjectStatus[]) => void;
  selectedStatuses: ProjectStatus[];
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  onStatusChange,
  selectedStatuses,
}) => {
  const statuses: ProjectStatus[] = [
    "Pending",
    "Approved",
    "Halted",
    "Deleted",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Status</h3>
      <div className="space-y-2">
        {statuses.map((status) => (
          <label key={status} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedStatuses.includes(status)}
              onChange={(e) => {
                const updatedStatuses = e.target.checked
                  ? [...selectedStatuses, status]
                  : selectedStatuses.filter((s) => s !== status);
                onStatusChange(updatedStatuses);
              }}
            />
            <span>{status}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
