import type { UserProfile } from "../../../user/di/UserInterface";

export interface AuthService {
  loginUser(user: UserProfile): UserProfile | Promise<UserProfile>;
} 