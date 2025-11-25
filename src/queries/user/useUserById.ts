import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@/api/user-management/getUserById';

export function useUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: ({ queryKey }) => getUserById(queryKey[1]),
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
