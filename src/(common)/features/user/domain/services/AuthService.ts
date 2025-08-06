export interface AuthService {
  login(email: string, password: string, role: string): Promise<{ token: string }>;
}