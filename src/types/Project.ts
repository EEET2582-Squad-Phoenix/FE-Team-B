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
  country: string;
  category: ProjectCategory;
  goal: number;
  status: ProjectStatus;
  isHighlighted: boolean;
}
