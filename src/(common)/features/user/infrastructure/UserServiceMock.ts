import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { UsersResponse } from '../../user/di/UserInterface'
import type { UserService } from '../domain/services/UserService'
import {
    getUsersApi,
    getUserProfileDetailsApi,
    editUserProfileDetailsApi,
} from '../domain/api/userApi'
import { userQueryKeys } from '../_constants/queryKeys'
import type { UserProfileDetails } from '../di/UserProfileDetails'
import { useStorage } from '@/shared/hoc/useStorageContext'

export const UserServiceMock: UserService = {
    // simulate login via your real loginUserApi
    getUsers: async (): Promise<UsersResponse> => {
        const response = await getUsersApi()
        return response as UsersResponse
    },
    getUserProfileDetails: async (
        user?: UserProfileDetails
    ): Promise<UserProfileDetails> => {
        if (user) {
            const response = await getUserProfileDetailsApi(user)
            return response.data.user as UserProfileDetails
        }

        throw new Error('User profile details are required')
    },

    editUserProfileDetails: async (
        user: UserProfileDetails
    ): Promise<UserProfileDetails> => {
        const response = await editUserProfileDetailsApi(user)
        return response.data.user as UserProfileDetails
    },
}

export function useUserQuery(): UseQueryResult<UsersResponse, unknown> {
    return useQuery<UsersResponse>({
        queryKey: userQueryKeys.userList,
        queryFn: () => UserServiceMock.getUsers(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export function useUserProfileDetailsQuery(): UseQueryResult<
    UserProfileDetails,
    unknown
> {
    const storage = useStorage()
    return useQuery<UserProfileDetails>({
        queryKey: userQueryKeys.userProfileDetails,
        queryFn: () => {
            const user = storage.getItem('userProfileDetails')
            return UserServiceMock.getUserProfileDetails(
                user as UserProfileDetails
            )
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export function useEditUserProfileDetailsQuery(
    user: UserProfileDetails
): UseQueryResult<UserProfileDetails, unknown> {
    const storage = useStorage()
    return useQuery<UserProfileDetails>({
        queryKey: userQueryKeys.editUserProfileDetails,
        queryFn: () => {
            if (storage.getItem('userProfileDetails')) {
                return Promise.resolve(
                    storage.getItem('userProfileDetails') as UserProfileDetails
                )
            }
            return UserServiceMock.editUserProfileDetails(user)
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
