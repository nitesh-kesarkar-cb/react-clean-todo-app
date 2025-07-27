import type { AuthService } from '../domain/services/AuthService';

export const AuthServiceMock: AuthService = {
  async login(_email: string, _password: string) {
    // fake success login
    return new Promise(resolve =>
      setTimeout(() => resolve({ token: 'fake-token-123' }), 500)
    );
  },
};
