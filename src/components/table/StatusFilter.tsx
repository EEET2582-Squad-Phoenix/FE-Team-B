import React from "react";
import { ProjectStatusType, ProjectStatuses } from "@/types/Project";
import { formatDisplayText } from "@/utils/projects/formatValues";

interface StatusFilterProps {
  onStatusChange: (status: ProjectStatusType[]) => void;
  selectedStatuses: ProjectStatusType[];
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  onStatusChange,
  selectedStatuses,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Status</h3>
      <div className="space-y-2">
        {ProjectStatuses.map((status) => (
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
            <span>{formatDisplayText(status)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
