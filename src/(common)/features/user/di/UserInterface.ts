import type { UserRole } from "../../../../shared/_constants/enums";

export interface UserProfile {
    id?: string;
    name: string;
    email: string;
    role: UserRole; // e.g., 'admin', 'org', etc.
    password?: string;
}
