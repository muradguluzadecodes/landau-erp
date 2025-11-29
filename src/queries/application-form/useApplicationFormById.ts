import { useQuery } from '@tanstack/react-query';

import { getApplicationFormById } from '@/api/application-form/getApplicationFormById';

export function useApplicationFormById(id: string | null) {
  return useQuery({
    queryKey: ['application_form', id],
    queryFn: () => getApplicationFormById(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}
