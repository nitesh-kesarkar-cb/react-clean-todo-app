import { userUseCase } from '../application/useCases/userUseCase'
import type { UserProfileDetails } from '../di/UserProfileDetails'

export const useUserViewModel = () => {
    const getUsers = async () => {
        // Simulate login, return user/token from real backend here
        const result = await userUseCase.execute()
        return result
    }
    const getUserProfileDetails = async () => {
        return await userUseCase.getUserProfileDetails()
    }

    const editUserProfileDetails = async (user: UserProfileDetails) => {
        return await userUseCase.editUserProfileDetails(user)
    }

    return { getUsers, getUserProfileDetails, editUserProfileDetails }
}
