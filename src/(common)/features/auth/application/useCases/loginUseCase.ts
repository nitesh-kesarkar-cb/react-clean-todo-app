import { UserRole } from '../../../../../shared/_constants/enums';
import { authContainer } from '../../di/container';

export const loginUseCase = {
  execute: async (name: string, email: string, password: string, role: string) => {
    return await authContainer.authService.loginUser({ name, email, password, role: role as UserRole });
  },
};
