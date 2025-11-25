
import { getApplicationForms } from '@/api/application-form/getApplicationForms';
import { useQuery } from '@tanstack/react-query';

export function useAllApplicationForm() {
  return useQuery({
    queryKey: ['all_aplication_forms'],
    queryFn: () => getApplicationForms(),
    refetchOnWindowFocus: false,
  });
}
