import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/api/user-management/getUser';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await getUser();

      // React Query MUST NOT receive undefined
      return data ?? null;
    },

    refetchOnWindowFocus: false,

    staleTime: Infinity, // never becomes stale
    refetchOnMount: false, // don't refetch on navigation
    refetchOnReconnect: false,
  });
}
