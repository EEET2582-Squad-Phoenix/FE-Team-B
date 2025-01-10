"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectsTable from "./ProjectsTable";
import { ProjectModal } from "./ProjectModal";
import StatusFilter from "../table/StatusFilter";
import CategoryFilter from "../table/CategoryFilter";
import useProjectPage from "./hooks/useProjectPage";
import ProgressFilter from "../table/ProgressFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchProjects } from "@/lib/features/projects/projectsSlice";
import HighlightFilter from "../table/HighlightFilter";
import IsGlobalFilter from "../table/IsGlobalFilter";

const ProjectsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.projects.status);
  const error = useSelector((state: RootState) => state.projects.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

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
    handleHighlightChange,
    handleGlobalChange,
    selectedHighlights,
    selectedGlobals,
  } = useProjectPage();

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
        <StatusFilter
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
        />
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
