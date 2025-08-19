import axios from 'axios'
import type { UserProfileDetails } from '../../di/UserProfileDetails'

export const getUsersApi = async (): Promise<unknown> => {
    try {
        const response = await axios.get('https://dummyjson.com/users')
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch user')
    }
}

export const getUserProfileDetailsApi = async (
    user: UserProfileDetails
): Promise<{ message: string; data: { user: UserProfileDetails } }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user) {
                resolve({
                    message: 'User profile details fetched successfully',
                    data: { user },
                })
            } else {
                reject(new Error('Failed to fetch user'))
            }
        }, 1000)
    })
}

export const editUserProfileDetailsApi = async (
    user: UserProfileDetails
): Promise<{ message: string; data: { user: UserProfileDetails } }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user) {
                resolve({
                    message: 'User profile details updated successfully',
                    data: { user },
                })
            } else {
                reject(new Error('Failed to update user'))
            }
        }, 1000)
    })
}
