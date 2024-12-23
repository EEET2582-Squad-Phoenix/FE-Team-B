// export type UserStatus = "Pending" | "Approved" | "Halted" | "Deleted";

export const UserRoles = ["DONOR", "CHARITY", "ADMIN"] as const;

export type UserRole = (typeof UserRoles)[number];

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  emailVerified: boolean;
  adminCreated: boolean;
  createdAt: string;
  updatedAt: string;
}
