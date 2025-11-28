import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { MAKE_ADMIN, USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import { SUCCESS_MAKE_ADMIN } from '@/lib/messages';

export async function makeAdmin(id: string) {
  try {
    await api.post(`${USER_BASE}/${id}${MAKE_ADMIN}`);

    toast.success(SUCCESS_MAKE_ADMIN);
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
