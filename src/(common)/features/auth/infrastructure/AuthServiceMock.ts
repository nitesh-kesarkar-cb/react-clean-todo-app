import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { UserProfile } from '@/shared/types/user.types'
import { authQueryKeys } from '../../../_constants/queryKeys'
import { loginUserApi } from '../domain/api/authApi'
import type { AuthService } from '../domain/services/AuthService'

export const AuthServiceMock: AuthService = {
    // simulate login via your real loginUserApi
    loginUser: async (user: UserProfile): Promise<UserProfile> => {
        const response = await loginUserApi(user)
        return response as UserProfile
    },
}

export function useLoginQuery(
    user: UserProfile
): UseQueryResult<UserProfile, unknown> {
    return useQuery<UserProfile>({
        queryKey: authQueryKeys.currentUser,
        queryFn: () => AuthServiceMock.loginUser(user),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
