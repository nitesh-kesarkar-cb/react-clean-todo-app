import { loginUseCase } from '../application/useCases/loginUseCase'

export const useLoginViewModel = () => {
  const login = async ({ name, email, password, role }: { name: string, email: string, password: string, role: string }) => {
    // Simulate login, return user/token from real backend here
    const result = await loginUseCase.execute(name, email, password, role);
    return result;
  };

    return { login }
}
