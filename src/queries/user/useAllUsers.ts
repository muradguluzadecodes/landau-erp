import { useQuery } from '@tanstack/react-query';

import {
  getAllUsers,
  GetAllUsersParams,
} from '@/api/user-management/getAllUsers';

export function useAllUsers(params: GetAllUsersParams) {
  return useQuery({
    queryKey: ['all_users', params],
    queryFn: () => getAllUsers(params),
    refetchOnWindowFocus: false,
  });
}
