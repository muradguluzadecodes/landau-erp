import { useQuery } from '@tanstack/react-query';

import { getAllInstituons } from '@/api/institutions/getAllInstitutions';

export function useAllInstituons() {
  return useQuery({
    queryKey: ['all_institutions'],
    queryFn: getAllInstituons,
    refetchOnWindowFocus: false,
  });
}
