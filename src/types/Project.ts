import { Donor } from "./Donor";

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

export const ProjectProgress = ["ONGOING", "FULL"] as const;

export type ProjectProgressType = "ONGOING" | "FULL";

export interface HaltMessage {
  charityReason: string;
  donorReason: string;
}

export interface Project {
  id: string;
  charityId: string;
  name: string;
  thumbnailUrl?: string;
  imageURLs?: string[];
  videoURLs?: string[];
  description?: string;
  country: string;
  goalAmount: number;
  raisedAmount: number;
  isGlobal: boolean;
  categories: ProjectCategoryType[];
  status: ProjectStatusType;
  haltedMessage?: HaltMessage;
  isHighlighted: boolean;
  fundStatus: ProjectProgressType;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  endDate: string;
  deletionReason?: string;
  donorList: Donor[];
}

// export interface UpdateProjectPayload {
//   id: string;
//   name: string;
//   imageURLs?: string[];
//   videoURLs?: string[];
//   description?: string;
//   country: string;
//   goalAmount: number;
//   categories: ProjectCategoryType[];
//   isGlobal: boolean;
//   startDate: string;
//   endDate: string;
// }

export interface HaltProjectPayload {
  projectId: string;
  donorReason?: string;
  charityReason?: string;
}
