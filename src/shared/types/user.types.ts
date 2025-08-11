export interface UserProfile {
    id?: string
    name: string
    email: string
    role: UserRole // e.g., 'admin', 'org', etc.
    password?: string
}

export enum UserRole {
    ADMIN = 'admin',
    ORG = 'org',
    USER = 'user',
    GUEST = 'guest',
}
