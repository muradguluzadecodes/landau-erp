// hooks/useSettings.ts
import { useQuery } from '@tanstack/react-query';

import { getSettings } from '@/api/settings/getSettings';

export function useSettings(
  activeTab: 'positions' | 'institutions' | 'departments',
  page: number,
  page_size: number,
) {
  return useQuery({
    queryKey: ['settings', activeTab, page, page_size],
    queryFn: () => getSettings(activeTab, page, page_size),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
