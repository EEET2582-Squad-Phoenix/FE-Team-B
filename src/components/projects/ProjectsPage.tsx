"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectsTable from "./ProjectsTable";
import { projectListSelector } from "@/lib/features/projects/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "@/types/Project";
import { ProjectModal } from "./ProjectModal";
import { addProject } from "@/lib/features/projects/projectsSlice";
import { v4 as uuidv4 } from "uuid";

const ProjectsPage = () => {
  const projectList = useSelector(projectListSelector);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewProjectHandler = () => {
    setIsModalOpen(true);
  };

  const handleSave = (newProject: Project) => {
    // Generate a unique ID if not provided
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      {/* Left Sidebar */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Status</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Approved</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Pending</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Halted</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Deleted</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Highlighted</span>
            </label>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Food</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Education</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Health</span>
            </label>
          </div>
        </div>

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
          <Input type="search" placeholder="Search..." className="max-w-sm" />
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
      />
    </div>
  );
};

export default ProjectsPage;
