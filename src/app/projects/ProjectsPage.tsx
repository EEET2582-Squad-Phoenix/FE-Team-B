"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Star,
  Pause,
  LucideIcon,
} from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

const ProjectsPage = () => {
  const projectsData = [
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
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-4 font-medium">ID</th>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Country</th>
                <th className="text-left py-3 px-4 font-medium">Category</th>
                <th className="text-left py-3 px-4 font-medium">Goal</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsData.map((project) => (
                <tr
                  key={project.id}
                  className={`border-b ${
                    project.isHighlighted
                      ? "bg-yellow-200"
                      : project.status === "halted"
                      ? "bg-gray-600 text-white"
                      : ""
                  }`}
                >
                  <td className="py-3 px-4">{project.id}</td>
                  <td className="py-3 px-4">{project.name}</td>
                  <td className="py-3 px-4">{project.country}</td>
                  <td className="py-3 px-4">{project.category}</td>
                  <td className="py-3 px-4">{project.goal}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <ActionButton
                        icon={Pencil}
                        disabled={project.status === "deleted"}
                        onClick={() => console.log("Edit", project.id)}
                        className="text-blue-600"
                      />
                      <ActionButton
                        icon={Trash2}
                        disabled={project.status === "deleted"}
                        onClick={() => console.log("Delete", project.id)}
                        className="text-red-600"
                      />
                      <ActionButton
                        icon={CheckCircle}
                        disabled={
                          project.status === "approved" ||
                          project.status === "deleted"
                        }
                        onClick={() => console.log("Approve", project.id)}
                        className="text-green-600"
                      />
                      <ActionButton
                        icon={Star}
                        disabled={
                          project.isHighlighted || project.status === "deleted"
                        }
                        onClick={() => console.log("Highlight", project.id)}
                        className="text-yellow-600"
                      />
                      <ActionButton
                        icon={Pause}
                        disabled={
                          project.status === "halted" ||
                          project.status === "deleted"
                        }
                        onClick={() => console.log("Halt", project.id)}
                        className="text-orange-600"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
