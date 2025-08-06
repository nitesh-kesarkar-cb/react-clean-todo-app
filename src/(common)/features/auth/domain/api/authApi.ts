import type { UserProfile } from "../../../user/di/UserInterface";

export const loginUserApi = async (user: UserProfile): Promise<UserProfile> => {
    return new Promise<UserProfile>((resolve, reject) => {
        setTimeout(() => {
            if (user) {
                resolve({ id: '123', name: user.name, email: user.email, role: user.role });
            } else {
                reject(new Error('Failed to fetch user'));
            }
        }, 1000);
    });
}
