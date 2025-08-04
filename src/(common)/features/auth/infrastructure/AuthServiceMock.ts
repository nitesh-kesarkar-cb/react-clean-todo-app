import type { AuthService } from '../domain/services/AuthService';

export const AuthServiceMock: AuthService = {
  async login(_email: string, _password: string, _role: string) {
    // fake success login
    console.log('Logging in user:', _email, _role);
    return new Promise(resolve =>
      
      setTimeout(() => {
        // Simulate storing user role in local storage
        localStorage.setItem('role', _role);
        resolve({ token: 'fake-token-123' })}, 500)
    );
  },
};
