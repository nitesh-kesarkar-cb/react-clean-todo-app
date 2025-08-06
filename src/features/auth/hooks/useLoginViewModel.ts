import { loginUseCase } from '../application/useCases/loginUseCase'

export const useLoginViewModel = () => {
    const login = async (email: string, password: string) => {
        // Simulate login, return user/token from real backend here
        const result = await loginUseCase.execute(email, password)
        return result
    }

    return { login }
}
