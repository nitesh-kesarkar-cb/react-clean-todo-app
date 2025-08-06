export const getUsersApi = async (): Promise<unknown> => {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
}
