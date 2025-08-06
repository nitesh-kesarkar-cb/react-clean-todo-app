import type { UsersResponse } from "../../di/UserInterface";

export interface UserService {
  getUsers(): Promise<UsersResponse>;
}