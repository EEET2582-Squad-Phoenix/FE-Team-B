export const ProjectStatuses = [
  "UNAPPROVED",
  "ACTIVE",
  "HALTED",
  "INACTIVATED",
  "COMPLETED",
] as const;

export type ProjectStatusType =
  | "UNAPPROVED"
  | "ACTIVE"
  | "HALTED"
  | "COMPLETED"
  | "INACTIVATED";

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

export type ProjectCategoryType =
  | "FOOD"
  | "EDUCATION"
  | "HEALTH"
  | "RELIGION"
  | "ENVIRONMENT"
  | "HOUSING"
  | "HUMANITARIAN"
  | "OTHER";

export const ProjectProgress = ["ON-GOING", "FULL"] as const;

export type ProjectProgressType = "ON-GOING" | "FULL";

export const ProjectRegions = ["GLOBAL", "REGIONAL"] as const;

export type ProjectRegionType = "GLOBAL" | "REGIONAL";

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
  category: ProjectCategoryType[];
  status: ProjectStatusType;
  haltedReason?: string[];
  isHighlighted: boolean;
  fundStatus: ProjectProgressType;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
  endedAt?: string;
}
