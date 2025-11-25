import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getUserById(id: string) {
  try {
    const res = await api.get(`${USER_BASE}/${id}/`);

    return res.data;
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
