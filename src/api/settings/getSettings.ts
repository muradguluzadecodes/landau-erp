// api/settings/getSettings.ts
import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { POSITIONS, INSTITUTIONS, DEPARTMENTS } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import { DirectoryVariants } from '@/lib/types';

export async function getSettings(
  type: DirectoryVariants,
  page: number,
  page_size: number,
) {
  const ENDPOINTS: Record<typeof type, string> = {
    positions: POSITIONS,
    institutions: INSTITUTIONS,
    departments: DEPARTMENTS,
    permissions: '',
  };

  try {
    const res = await api.get(ENDPOINTS[type], {
      params: { page, page_size },
    });

    return res.data;
  } catch (err: any) {
    if (err.status === '400') {
      /*YOUR MESSAGE HERE */
    }

    toast.error(INTERNAL_SERVER);

    return {
      results: [],
      count: 0,
    };
  }
}
