import { userContainer } from '../../di/container'
import type { UserProfileDetails } from '../../di/UserProfileDetails'

export const userUseCase = {
    execute: async () => {
        return await userContainer.userService.getUsers()
    },
    getUserProfileDetails: async () => {
        return await userContainer.userService.getUserProfileDetails()
    },
    editUserProfileDetails: async (user: UserProfileDetails) => {
        return await userContainer.userService.editUserProfileDetails(user)
    },
}
