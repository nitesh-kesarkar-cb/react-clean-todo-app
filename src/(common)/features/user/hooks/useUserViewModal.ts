import { userUseCase } from '../application/useCases/userUseCase';

export const useUserViewModel = () => {
  const getUsers = async () => {
    // Simulate login, return user/token from real backend here
    const result = await userUseCase.execute();
    return result;
  };

  return { getUsers };
};
