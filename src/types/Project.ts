export type ProjectStatus = "pending" | "approved" | "halted" | "deleted";

export type ProjectCategory = "Food" | "Education" | "Health";

export interface Project {
  id: string;
  name: string;
  country: string;
  category: ProjectCategory;
  goal: string;
  status: ProjectStatus;
  isHighlighted: boolean;
}
