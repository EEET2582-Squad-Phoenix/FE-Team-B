export interface Charity {
    id: string;
    email: string;
    password: string;
    role: "CHARITY";
    name: string;
    address: string;
    taxCode: string;
    type: string;
    avatar: string | null;
    video: string | null;
}