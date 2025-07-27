import { authContainer } from '../../di/container';

export const loginUseCase = {
  execute: async (email: string, password: string) => {
    return await authContainer.authService.login(email, password);
  },
};
