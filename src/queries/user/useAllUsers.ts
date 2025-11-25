import { useQuery } from '@tanstack/react-query';

import { getAllUsers } from '@/api/user-management/getAllUsers';

export function useAllUsers() {
  return useQuery({
    queryKey: ['all_users'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });
}
