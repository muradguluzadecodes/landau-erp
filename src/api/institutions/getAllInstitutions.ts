import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { GET_ALL_INSTITUTIONS } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getAllInstituons() {
  try {
    const res = await api.get(GET_ALL_INSTITUTIONS);

    return res.data;
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
