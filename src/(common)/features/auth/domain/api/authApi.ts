import type { UserProfile } from "../../di/UserInterface";

export const loginUserApi = async (): Promise<UserProfile> => {
    const response = await fetch('/api/auth/me', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
}
