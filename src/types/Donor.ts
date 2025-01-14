export interface Donor {
    id: string;
    email: string;
    password: string;
    role: "DONOR";
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    introVidUrl: string | null;
    address: string;
    language: string;
    monthlyDonation: number;

    stripeCustomerId: string;
}