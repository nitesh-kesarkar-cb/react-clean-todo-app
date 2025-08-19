import type { UsersResponse } from '../../di/UserInterface'
import type { UserProfileDetails } from '../../di/UserProfileDetails'

export interface UserService {
    getUsers(): Promise<UsersResponse>
    getUserProfileDetails(
        user?: UserProfileDetails
    ): Promise<UserProfileDetails>
    editUserProfileDetails(
        user: UserProfileDetails
    ): Promise<UserProfileDetails>
}
