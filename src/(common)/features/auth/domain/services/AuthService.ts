import type { UserProfile } from '@/shared/types/user.types'

export interface AuthService {
    loginUser(user: UserProfile): UserProfile | Promise<UserProfile>
}
