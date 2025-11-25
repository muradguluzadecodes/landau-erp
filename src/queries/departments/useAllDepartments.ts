import { useQuery } from '@tanstack/react-query';

import { getAllDepartments } from '@/api/departments/getAllDepartments';

export function useAllDepartments() {
  return useQuery({
    queryKey: ['all_departments'],
    queryFn: getAllDepartments,
    refetchOnWindowFocus: false,
  });
}
