import { useQuery } from '@tanstack/react-query';

import { getAllPositions } from '@/api/positions/getAllPositions';

export function useAllPositions() {
  return useQuery({
    queryKey: ['all_positions'],
    queryFn: getAllPositions,
    refetchOnWindowFocus: false,
  });
}
