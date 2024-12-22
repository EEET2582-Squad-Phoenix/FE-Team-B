"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, BarChart3, FolderKanban } from "lucide-react";
import ProjectsPage from "@/components/projects/ProjectsPage";
import UsersPage from "@/components/users/UsersPage";
import StatisticsPage from "@/components/statistics/StatisticsPage";

const DashboardContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="lg:mx-8 mx-4">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="bg-blue-500 p-1">
              <TabsTrigger
                value="projects"
                className="flex items-center gap-2 text-white data-[state=active]:bg-yellow-500"
              >
                <FolderKanban className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="flex items-center gap-2 text-white data-[state=active]:bg-yellow-500"
              >
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="flex items-center gap-2 text-white data-[state=active]:bg-yellow-500"
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
