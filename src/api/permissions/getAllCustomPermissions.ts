import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { CUSTOM_PERMISSIONS_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getAllCustomPermissions() {
  try {
    const res = await api.get(CUSTOM_PERMISSIONS_BASE);

    return res.data;
  } catch (err: any) {
    if (err.status === 400) {
      // Handle specific error if needed
    }

    toast.error(INTERNAL_SERVER);
    throw err;
  }
}
