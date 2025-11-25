import { useQuery } from '@tanstack/react-query';

import { getEmailLogs } from '@/api/email-management/getEmailLogs';

export function useEmailLogs(page: number, pageSize: number, isAll: boolean) {
  return useQuery({
    queryKey: ['emailLogs', page, pageSize, isAll],
    queryFn: () =>
      getEmailLogs({
        page,
        page_size: pageSize,
        is_succeeded: isAll ? undefined : false,
      }),
    // keepPreviousData: true,
  });
}
