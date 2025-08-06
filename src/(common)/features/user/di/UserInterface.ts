import type { UserRole } from "../../../../shared/_constants/enums";

export interface UserProfile {
    id?: string;
    name: string;
    email: string;
    role: UserRole; // e.g., 'admin', 'org', etc.
    password?: string;
}


export interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    ip: string;
    macAddress: string;
    university: string;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}

export interface UsersResponse {
    users: UserDetails[];
    total: number;
    skip: number;
    limit: number;
}