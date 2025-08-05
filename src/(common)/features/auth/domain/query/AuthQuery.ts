import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '../../di/UserInterface';
import { loginUserApi } from '../api/authApi';
import { authQueryKeys } from '../../../../_constants/queryKeys';


export function useLoginQuery() {
    return useQuery<UserProfile>({
        queryKey: authQueryKeys.currentUser,
        queryFn: loginUserApi,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}