"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectsTable from "./ProjectsTable";
import { ProjectModal } from "./ProjectModal";
import StatusFilter from "../table/StatusFilter";
import CategoryFilter from "../table/CategoryFilter";
import useProjectPage from "./hooks/useProjectPage";
import ProgressFilter from "../table/ProgressFilter";

const ProjectsPage = () => {
  const {
    projectList,
    isModalOpen,
    setIsModalOpen,
    selectedCategories,
    selectedStatuses,
    searchQuery,
    addNewProjectHandler,
    handleSave,
    handleCategoryChange,
    handleStatusChange,
    handleSearchChange,
    selectedProgress,
    handleProgressChange,
  } = useProjectPage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      {/* Left Sidebar */}
      <div className="space-y-6">
        <StatusFilter
          onStatusChange={handleStatusChange}
          selectedStatuses={selectedStatuses}
        />
        <CategoryFilter
          onCategoryChange={handleCategoryChange}
          selectedCategories={selectedCategories}
        />

        <ProgressFilter
          onProgressChange={handleProgressChange}
          selectedProgress={selectedProgress}
        />
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
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
            onClick={addNewProjectHandler}
          >
            + NEW PROJECT
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <ProjectsTable projects={projectList} />
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        onApprove={() => {}}
      />
    </div>
  );
};

export default ProjectsPage;
