import React, { useState } from "react";
import { User } from "@/types/User";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Star,
  Play,
  Pause,
  ArchiveRestore,
  Archive,
  Globe,
  MapPinned,
} from "lucide-react";
import { UserModal } from "./UserModal";
import ActionButton from "@/components/table/ActionButton";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserActions } from "./hooks/useUserActions";
// import { useUserModal } from "./hooks/useUserModal";
// import {
//   formatAmount,
//   formatDisplayText,
//   formatDuration,
//   getStatusColor,
// } from "@/utils/users/formatValues";
// import { HaltUserModal } from "./HaltUserModal";
// import { useHaltUserModal } from "./hooks/useHaltUserModal";
// import { useDeactivateUserModal } from "./hooks/useDeactivateUserModal";
// import { DeactivateUserModal } from "./DeactivateUserModal";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  // const {
  //   handleDeleteUser,
  //   handleUpdateUser,
  //   handleApproveUser,
  //   handleHighlightUser,
  //   handleRestoreUser,
  // } = useUserActions();

  // const {
  //   isModalOpen,
  //   currentUser,
  //   setIsModalOpen,
  //   handleEditUser,
  //   handleModalSave,
  // } = useUserModal(handleUpdateUser);

  // const {
  //   isHaltModalOpen,
  //   setIsHaltModalOpen,
  //   selectedHaltUser,
  //   openHaltModal,
  //   handleHaltUser,
  //   handleResumeUser,
  // } = useHaltUserModal();

  // const {
  //   isDeactivateModalOpen,
  //   setIsDeactivateModalOpen,
  //   selectedDeactivatedUser,
  //   openDeactivateModal,
  //   handleDeactivateUser,
  // } = useDeactivateUserModal();

  const [userCount, setUserCount] = useState(users.length);

  return (
    <>
      <div className="text-xl font-bold mb-4">
        Total Users: {userCount}
      </div>
      {/* // button to increase user count */}
      <button onClick={() => setUserCount(userCount + 1)}>
        Add User
      </button>
      <Table className="max-w-full">
        <TableHeader>
          <TableRow>
            <TableHead id="id-column">ID</TableHead>
            <TableHead id="thumbnail-column">Email</TableHead>
            <TableHead id="country-column">Role</TableHead>
            <TableHead id="scope-column">Email Verified</TableHead>
            <TableHead id="category-column">Admin Created</TableHead>
            <TableHead id="status-column">Created At</TableHead>
            <TableHead id="amount-column">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, i) => (
            <TableRow
              key={i}
              className={
                ""
              }
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.email}
              </TableCell>
              <TableCell>
                {user.role}
              </TableCell>
              <TableCell>
                {user.emailVerified.toString()}
              </TableCell>
              <TableCell>
                {user.adminCreated.toString()}
              </TableCell>
              <TableCell>
                {user.createdAt}
              </TableCell>
              <TableCell>
                {user.updatedAt}
              </TableCell>
              <TableCell>
                {/* <div className="flex items-center space-x-1">
                  {user.status === "INACTIVATED" ? (
                    <>
                      <ActionButton
                        icon={ArchiveRestore}
                        onClick={() => handleRestoreUser(user.id)}
                        className="text-green-600"
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600"
                      />
                    </>
                  ) : (
                    <>
                      <ActionButton
                        icon={Pencil}
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600"
                      />
                      <ActionButton
                        icon={CheckCircle}
                        disabled={user.status !== "UNAPPROVED"}
                        onClick={() => handleApproveUser(user.id)}
                        className="text-green-600"
                      />
                      <ActionButton
                        icon={Star}
                        disabled={user.status !== "ACTIVE"}
                        onClick={() => handleHighlightUser(user.id)}
                        className={
                          user.isHighlighted
                            ? user.status !== "ACTIVE"
                              ? "text-gray-400"
                              : "text-yellow-600"
                            : user.status !== "ACTIVE"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      />
                      <ActionButton
                        icon={user.status === "HALTED" ? Play : Pause}
                        disabled={
                          !["ACTIVE", "HALTED"].includes(user.status)
                        }
                        onClick={() => openHaltModal(user)}
                        className={
                          user.status === "HALTED"
                            ? "text-green-600"
                            : "text-orange-600"
                        }
                      />
                      <ActionButton
                        icon={Archive}
                        onClick={() => openDeactivateModal(user)}
                        className="text-gray-600"
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600"
                      />
                    </>
                  )}
                </div> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <UserModal
        user={currentUser}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleModalSave}
        onApprove={handleApproveUser}
      />
      <HaltUserModal
        user={selectedHaltUser}
        open={isHaltModalOpen}
        onOpenChange={setIsHaltModalOpen}
        onHalt={handleHaltUser}
        onResume={handleResumeUser}
      />
      <DeactivateUserModal
        user={selectedDeactivatedUser}
        open={isDeactivateModalOpen}
        onOpenChange={setIsDeactivateModalOpen}
        onDeactivate={handleDeactivateUser}
      /> */}
    </>
  );
};

export default UsersTable;
