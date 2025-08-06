import type { AuthService } from '../domain/services/AuthService'

export const AuthServiceMock: AuthService = {
    async login(email: string, password: string) {
        console.log('Mock login called with:', email, password)
        // fake success login
        return new Promise((resolve) =>
            setTimeout(() => resolve({ token: 'fake-token-123' }), 500)
        )
    },
}
