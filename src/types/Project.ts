export const ProjectStatuses = [
  "Unapproved",
  "Active",
  "Halted",
  "Inactive",
  "Completed",
] as const;

export type ProjectStatus = (typeof ProjectStatuses)[number];

export const ProjectCategories = [
  "Food",
  "Health",
  "Education",
  "Environment",
  "Religion",
  "Humanitarian",
  "Housing",
  "Other",
] as const;

export type ProjectCategory = (typeof ProjectCategories)[number];

export interface Project {
  id: string;
  name: string;
  thumbnailURL?: string;
  imageURLs?: string[]; // 15
  videoURLs?: string[]; // 4
  description?: string;
  country: string;
  goalAmount: number;
  raisedAmount: number;
  isGlobal: boolean;
  category: ProjectCategory;
  status: ProjectStatus;
  haltedReason?: string[];
  isHighlighted: boolean;
  isFullyFunded: boolean;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
  endedAt?: string;
}
