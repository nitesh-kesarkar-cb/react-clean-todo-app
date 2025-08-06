import { userContainer } from '../../di/container';

export const userUseCase = {
  execute: async () => {
    return await userContainer.userService.getUsers();
  },
};
