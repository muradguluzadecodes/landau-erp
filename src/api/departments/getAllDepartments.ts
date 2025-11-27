import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { DEPARTMENTS } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getAllDepartments() {
  try {
    const res = await api.get(DEPARTMENTS);

    return res.data;
  } catch (err: any) {
    if (err.status === 400) {
      // Handle specific error if needed
    }

    toast.error(INTERNAL_SERVER);
    throw err;
  }
}
