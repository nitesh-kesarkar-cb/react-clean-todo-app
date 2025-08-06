import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type {  UsersResponse } from '../../user/di/UserInterface';
import type { UserService } from '../domain/services/UserService';
import { getUsersApi } from '../domain/api/userApi';
import { userQueryKeys } from '../_constants/queryKeys';

export const UserServiceMock: UserService  = {
  // simulate login via your real loginUserApi
  getUsers: async (): Promise<UsersResponse> => {
    const response = await getUsersApi();
    return response as UsersResponse;
  },
};

export function useUserQuery(): UseQueryResult<UsersResponse, unknown> {
  return useQuery<UsersResponse>({
    queryKey: userQueryKeys.userList,
    queryFn: () => UserServiceMock.getUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
