export const ProjectStatuses = [
  "UNAPPROVED",
  "ACTIVE",
  "HALTED",
  "INACTIVATED",
  "HIDDEN",
  "COMPLETED",
] as const;

export type ProjectStatus = (typeof ProjectStatuses)[number];

export const ProjectCategories = [
  "FOOD",
  "EDUCATION",
  "HEALTH",
  "RELIGION",
  "ENVIRONMENT",
  "HOUSING",
  "HUMANITARIAN",
  "OTHER",
] as const;

export type ProjectCategory = (typeof ProjectCategories)[number];

export const ProjectProgress = ["ON-GOING", "FULL"] as const;

export type ProjectProgressType = (typeof ProjectProgress)[number];

export const ProjectRegion = ["GLOBAL", "REGIONAL"] as const;

export type ProjectRegionType = (typeof ProjectRegion)[number];

export interface Project {
  id: string;
  name: string;
  imageURLs?: string[]; // 15
  videoURLs?: string[]; // 4
  description?: string;
  country: string;
  goalAmount: number;
  raisedAmount: number;
  region: ProjectRegionType;
  category: ProjectCategory;
  status: ProjectStatus;
  haltedReason?: string[];
  isHighlighted: boolean;
  fundStatus: ProjectProgressType;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
  endedAt?: string;
}
