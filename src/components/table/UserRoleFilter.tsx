import React from "react";

import { UserRoles } from "@/types/User";
import { formatDisplayText } from "@/utils/projects/formatValues";

interface UserRoleFilterProps {
  onRoleChange: (roles: (keyof typeof UserRoles)[]) => void;
  selectedRoles: (keyof typeof UserRoles)[];
}

const UserRoleFilter: React.FC<UserRoleFilterProps> = ({
  onRoleChange,
  selectedRoles,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Role</h3>
      <div className="space-y-2">
        {Object.keys(UserRoles).map((role) => (
          <label key={role} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedRoles.includes(role as keyof typeof UserRoles)}
              onChange={(e) => {
                const updatedRoles = e.target.checked
                  ? [...selectedRoles, role as keyof typeof UserRoles]
                  : selectedRoles.filter((r) => r !== role);
                onRoleChange(updatedRoles);
              }}
            />
            <span>{formatDisplayText(role)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default UserRoleFilter;