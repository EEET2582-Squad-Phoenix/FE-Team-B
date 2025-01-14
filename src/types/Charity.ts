export type CharityType = "INDIVIDUAL" | "COMPANY" | "NON_PROFIT";

export interface Charity {
    id: string;
    email: string;
    password: string;
    role: "CHARITY";
    name: string;
    displayedLogo: string;
    displayedIntroVid: string;
    logoUrl?: string[];
    introVidUrl?: string[];
    address: string;
    taxCode: string;
    type: CharityType;
    monthlyDonation: number;
    avatar: string | null;
    video: string | null;
}