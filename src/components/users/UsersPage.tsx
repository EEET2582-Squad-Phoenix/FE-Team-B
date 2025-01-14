"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UsersTable from "./UsersTable";
import { UserModal } from "./UserModal";
import StatusFilter from "../table/StatusFilter";
import CategoryFilter from "../table/CategoryFilter";
import useUserPage from "./hooks/useUserPage";
import ProgressFilter from "../table/ProgressFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchUsers } from "@/lib/features/users/usersSlice";
import HighlightFilter from "../table/HighlightFilter";
import IsGlobalFilter from "../table/IsGlobalFilter";

const UsersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const {
    userList,
    isModalOpen,
    setIsModalOpen,
    // selectedCategories,
    // selectedStatuses,
    searchQuery,
    addNewUserHandler,
    // handleSave,
    // handleCategoryChange,
    // handleStatusChange,
    handleSearchChange,
    // selectedProgress,
    // handleProgressChange,
    // handleHighlightChange,
    // handleGlobalChange,
    selectedHighlights,
    selectedGlobals,
  } = useUserPage();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex gap-6 mt-6">
      {/* Left Sidebar */}
      <div className="w-64 space-y-6 shrink-0">
        {/* <StatusFilter
          onStatusChange={handleStatusChange}
          selectedStatuses={selectedStatuses}
        />
        <CategoryFilter
          onCategoryChange={handleCategoryChange}
          selectedCategories={selectedCategories}
        />

        <HighlightFilter
          onHighlightChange={handleHighlightChange}
          selectedHighlights={selectedHighlights}
        />
        <IsGlobalFilter
          onGlobalChange={handleGlobalChange}
          selectedGlobals={selectedGlobals}
        />

        <ProgressFilter
          onProgressChange={handleProgressChange}
          selectedProgress={selectedProgress}
        /> */}
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <Input
            type="search"
            placeholder="Search..."
            className="max-w-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={addNewUserHandler}
          >
            + NEW PROJECT
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <UsersTable users={userList} />
        </div>
      </div>

      {/* User Modal */}
      {/* <UserModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        onApprove={() => {}}
      /> */}
    </div>
  );
};

export default UsersPage;
