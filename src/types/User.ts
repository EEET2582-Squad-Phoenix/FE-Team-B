// export type UserStatus = "Pending" | "Approved" | "Halted" | "Deleted";

export const UserRoles = ["DONOR", "CHARITY"] as const;


export type UserRoleType = "DONOR" | "CHARITY";

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


export interface Donor extends User{
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  introVidUrl: string | null;
  address: string;
}

export type CharityType = "INDIVIDUAL" | "COMPANY" | "NON_PROFIT";

export interface Charity extends User{
    name: string;
    displayedLogo: string;
    displayedIntroVid: string;
    logoUrl?: string[] | null;
    introVidUrl?: string[] | null;
    address: string;
    taxCode: string;
    type: CharityType;
    monthlyDonation: number;
    avatar: string | null;
    video: string | null;
}
