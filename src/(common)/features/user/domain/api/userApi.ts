import axios from 'axios';

export const getUsersApi = async (): Promise<unknown> => {
    try {
        const response = await axios.get('https://dummyjson.com/users');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user');
    }
}
