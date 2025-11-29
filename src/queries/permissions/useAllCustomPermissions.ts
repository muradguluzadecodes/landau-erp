import { useQuery } from '@tanstack/react-query';

import { getAllCustomPermissions } from '@/api/permissions/getAllCustomPermissions';

export function useAllCustomPermissions() {
  return useQuery({
    queryKey: ['custom_permissions'],
    queryFn: getAllCustomPermissions,
    refetchOnWindowFocus: false,
  });
}
