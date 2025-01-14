import React from "react";
import { UserRoleType, UserRoles } from "@/types/User";
// import { formatDisplayText } from "@/utils/users/formatValues";

interface RoleFilterProps {
  onRoleChange: (role: UserRoleType[]) => void;
  selectedRoles: UserRoleType[];
}

const RoleFilter: React.FC<RoleFilterProps> = ({
  onRoleChange,
  selectedRoles,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Role</h3>
      <div className="space-y-2">
        {UserRoles.map((role) => (
          <label key={role} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedRoles.includes(role)}
              onChange={(e) => {
                const updatedRoles = e.target.checked
                  ? [...selectedRoles, role]
                  : selectedRoles.filter((s) => s !== role);
                onRoleChange(updatedRoles);
              }}
            />
            <span>{role}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleFilter;
