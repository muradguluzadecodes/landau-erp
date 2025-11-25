import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { GET_USER, USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getUser() {
  try {
    if (Cookies.get('token')) {
      const res = await api.get(`${USER_BASE}${GET_USER}`);

      return res.data;
    }
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
