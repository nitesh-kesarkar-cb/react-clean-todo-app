import { AuthServiceMock } from '../infrastructure/AuthServiceMock'

export const authContainer = {
    authService: AuthServiceMock,
}

export type AuthContainer = typeof authContainer
