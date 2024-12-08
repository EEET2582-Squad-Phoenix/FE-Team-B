"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectsTable from "./ProjectsTable";
import { Project } from "@/types/Project";

const ProjectsPage = () => {
  const projectsData: Project[] = [
    {
      id: "PRJ01",
      name: "Project 1",
      country: "Country 1",
      category: "Food",
      goal: "10,000$",
      status: "pending",
      isHighlighted: false,
    },
    {
      id: "PRJ02",
      name: "Project 2",
      country: "Country 2",
      category: "Food",
      goal: "25,000$",
      status: "approved",
      isHighlighted: true,
    },
    {
      id: "PRJ03",
      name: "Project 3",
      country: "Country 3",
      category: "Education",
      goal: "15,000$",
      status: "halted",
      isHighlighted: false,
    },
    {
      id: "PRJ04",
      name: "Project 4",
      country: "Country 4",
      category: "Health",
      goal: "30,000$",
      status: "pending",
      isHighlighted: false,
    },
    {
      id: "PRJ05",
      name: "Project 5",
      country: "Country 5",
      category: "Education",
      goal: "20,000$",
      status: "deleted",
      isHighlighted: false,
    },
  ];

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
          <Button className="bg-blue-500 hover:bg-blue-600">
            + NEW PROJECT
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <ProjectsTable projectsData={projectsData} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
