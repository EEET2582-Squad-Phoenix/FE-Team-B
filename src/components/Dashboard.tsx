"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, BarChart3, FolderKanban } from "lucide-react";
import ProjectsPage from "@/app/projects/ProjectsPage";
import UsersPage from "@/app/users/UsersPage";
import StatisticsPage from "@/app/statistics/StatisticsPage";

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
              <ProjectsPage />
            </TabsContent>

            <TabsContent value="users">
              <UsersPage />
            </TabsContent>

            <TabsContent value="statistics">
              <StatisticsPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
