import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { POSITIONS } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getAllPositions() {
  try {
    const res = await api.get(POSITIONS);

    return res.data;
  } catch (err: any) {
    if (err.status === 400) {
      // Handle specific error if needed
    }

    toast.error(INTERNAL_SERVER);
  }
}
