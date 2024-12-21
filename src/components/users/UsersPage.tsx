"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UsersTable from "./UsersTable";
import { userListSelector } from "@/lib/features/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/types/User";
import { UserModal } from "./UserModal";
import { addUser } from "@/lib/features/users/usersSlice";
import { v4 as uuidv4 } from "uuid";

const UsersPage = () => {
  const userList = useSelector(userListSelector);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewUserHandler = () => {
    setIsModalOpen(true);
  };

  const handleSave = (newUser: User) => {
    // Generate a unique ID if not provided
    const userToSave = {
      ...newUser,
      id: newUser.id || uuidv4(),
      role: newUser.role || "DONOR",
    };

    dispatch(addUser(userToSave));
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      {/* Left Sidebar */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Role</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Donor</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Charity</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <Input type="search" placeholder="Search..." className="max-w-sm" />
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={addNewUserHandler}
          >
            + NEW USER
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <UsersTable usersData={userList} />
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
      />
    </div>
  );
};

export default UsersPage;
