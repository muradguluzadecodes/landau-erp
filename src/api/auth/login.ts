import Cookies from 'js-cookie';

import api from '@/lib/axios';
import { LOGIN } from '@/lib/endpoints';
import { INVALID_CREDENTIALS } from '@/lib/errors';
// import { ADMIN_AUTH, INTERNAL_SERVER } from '@/lib/errors';

export async function login(
  data: {
    email: string;
    password: string;
  },
  func?: () => void,
) {
  try {
    const res = await api.post(LOGIN, data);
    const token = res.data.access;

    if (token) {
      Cookies.set('token', token as string, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
    }

    if (func) func();
  } catch (err: any) {
    if (err.status === 400) {
      throw new Error(INVALID_CREDENTIALS);
    }

    throw new Error('ERROR ');
  }
}
