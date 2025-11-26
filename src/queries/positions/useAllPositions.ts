import { useQuery } from '@tanstack/react-query';

import { getAllPermissions } from '@/api/permissions/getAllPermissions';

export function useAllPermissions() {
  return useQuery({
    queryKey: ['all_positions'],
    queryFn: getAllPermissions,
    refetchOnWindowFocus: false,
  });
}
