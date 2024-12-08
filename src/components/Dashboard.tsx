'use client'

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, FolderKanban } from 'lucide-react';

const projectsData = [
  { id: 'PRJ01', name: 'Project 1', country: 'Country 1', category: 'Food', goal: 'xxx$' },
  { id: 'PRJ02', name: 'Project 2', country: 'Country 2', category: 'Food', goal: 'xxx$' },
  { id: 'PRJ03', name: 'Project 3', country: 'Country 3', category: 'Education', goal: 'xxx$' },
  { id: 'PRJ04', name: 'Project 4', country: 'Country 4', category: 'Health', goal: 'xxx$' },
];

const DashboardContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="p-4">
        <div className="max-w-7xl mx-auto">          
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="bg-blue-500 p-1">
              <TabsTrigger 
                value="projects" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600"
              >
                <FolderKanban className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600"
              >
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="statistics" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600"
              >
                <BarChart3 className="h-4 w-4" />
                Statistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
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
                    <Input 
                      type="search" 
                      placeholder="Search..." 
                      className="max-w-sm"
                    />
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
                        </tr>
                      </thead>
                      <tbody>
                        {projectsData.map((project) => (
                          <tr 
                            key={project.id}
                            className={`border-b ${
                              project.id === 'PRJ02' ? 'bg-yellow-100' :
                              project.id === 'PRJ03' ? 'bg-gray-800 text-white' :
                              ''
                            }`}
                          >
                            <td className="py-3 px-4">{project.id}</td>
                            <td className="py-3 px-4">{project.name}</td>
                            <td className="py-3 px-4">{project.country}</td>
                            <td className="py-3 px-4">{project.category}</td>
                            <td className="py-3 px-4">{project.goal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="p-4">Users content goes here</div>
            </TabsContent>

            <TabsContent value="statistics">
              <div className="p-4">Statistics content goes here</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;