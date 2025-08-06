import { loginUseCase } from '../application/useCases/userUseCase';

export const useLoginViewModel = () => {
  const login = async (email: string, password: string, role: string) => {
    // Simulate login, return user/token from real backend here
    const result = await loginUseCase.execute(email, password, role);
    return result;
  };

  return { login };
};
