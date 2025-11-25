import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function deleteUserById(id: string, func?: () => void) {
  try {
    await api.delete(`${USER_BASE}${id}/`);

    if (func) func();
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
