import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { GET_ALL_PERMISSIONS } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getAllPermissions() {
  try {
    const res = await api.get(GET_ALL_PERMISSIONS);

    return res.data;
  } catch (err: any) {
    if (err.status === 400) {
      // Handle specific error if needed
    }

    toast.error(INTERNAL_SERVER);
  }
}
