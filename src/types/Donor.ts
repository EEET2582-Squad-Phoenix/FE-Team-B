export interface Donor {
    id: string;
    email: string;
    password: string;
    role: "DONOR";
    firstName: string;
    lastName: string;
    address: string;
    language: string;
    avatar: string | null;
    video: string | null;
}