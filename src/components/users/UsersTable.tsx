import React, { useState } from "react";
import {
  deleteUser,
  updateUser,
} from "@/lib/features/users/usersSlice";
import { User } from "@/types/User";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Star,
  Pause,
  LucideIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { UserModal } from "./UserModal"; // Assuming the modal is in the same directory

interface UsersTableProps {
  usersData: User[];
}

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

const UsersTable = ({ usersData }: UsersTableProps) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(
    undefined
  );

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  // Open modal for editing a user
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  // Handle user update from modal
  const handleUpdateUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser));
    setIsModalOpen(false);
    setCurrentUser(undefined);
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
  
    return `${hours}:${minutes} ${day}/${month}/${year}`; // Example output: "14:30 20/12/24"
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left py-3 px-4 font-medium">ID</th>
            <th className="text-left py-3 px-4 font-medium">Email</th>
            <th className="text-left py-3 px-4 font-medium">Password</th>
            <th className="text-left py-3 px-4 font-medium">Role</th>
            <th className="text-left py-3 px-4 font-medium">Email Verified</th>
            <th className="text-left py-3 px-4 font-medium">Created At</th>
            <th className="text-left py-3 px-4 font-medium">Updated At</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr
              key={user.id}
            >
              <td className="py-3 px-4" style={{maxWidth: '100px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{user.id}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.password}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4">{user.emailVerified.toString()}</td>
              <td className="py-3 px-4">{formatDate(user.createdAt)}</td>
              <td className="py-3 px-4">{formatDate(user.updatedAt)}</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-1">
                  <ActionButton
                    icon={Pencil}
                    disabled={false}
                    onClick={() => handleEditUser(user)}
                    className="text-blue-600"
                  />
                  <ActionButton
                    icon={Trash2}
                    disabled={false}
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        user={currentUser}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleUpdateUser}
      />
    </>
  );
};

export default UsersTable;

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  onClick,
  disabled,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-1.5 transition-colors ${
      disabled ? "text-gray-300" : `${className} `
    }`}
  >
    <Icon size={18} />
  </button>
);
