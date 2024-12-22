"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectsTable from "./ProjectsTable";
import { useDispatch, useSelector } from "react-redux";
import { Project, ProjectCategory, ProjectStatus } from "@/types/Project";
import { ProjectModal } from "./ProjectModal";
import { addProject } from "@/lib/features/projects/projectsSlice";
import { v4 as uuidv4 } from "uuid";
import { filteredProjectsSelector } from "@/lib/features/projects/selectors";
import { setCategory, setSearch, setStatus } from "@/lib/features/projects/filtersSlice";
import StatusFilter from "../table/StatusFilter";
import CategoryFilter from "../table/CategoryFilter";

const ProjectsPage = () => {
  const projectList = useSelector(filteredProjectsSelector);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addNewProjectHandler = () => {
    setIsModalOpen(true);
  };

  const handleSave = (newProject: Project) => {
    const projectToSave = {
      ...newProject,
      id: newProject.id || uuidv4(),
      status: newProject.status || "Pending",
      category: newProject.category || "Food",
      isHighlighted: newProject.isHighlighted || false,
    };

    dispatch(addProject(projectToSave));
    setIsModalOpen(false);
  };

  const handleCategoryChange = (categories: ProjectCategory[]) => {
    setSelectedCategories(categories);
    dispatch(setCategory(categories));
  };

  const handleStatusChange = (statuses: ProjectStatus[]) => {
    setSelectedStatuses(statuses);
    dispatch(setStatus(statuses));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setSearch(query));
  };

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

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Country</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Country 1</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Country 2</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Country 3</span>
            </label>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Donation progress</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Active</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Completed</span>
            </label>
          </div>
        </div>
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