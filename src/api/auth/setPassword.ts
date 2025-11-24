import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { RESET_PASSWORD } from '@/lib/endpoints';
import { EASY_PASSWORD, INTERNAL_SERVER } from '@/lib/errors';
import { SUCCESS_SET_PASSWORD } from '@/lib/messages';

export interface SetPasswordData {
  password: string;
  confirm_password: string;
  uid: string;
  token: string;
}

export async function setPassword(data: SetPasswordData, func: () => void) {
  try {
    await api.post(RESET_PASSWORD, data);
    toast.success(SUCCESS_SET_PASSWORD);

    if (func) func();
  } catch (err: any) {
    if (err.status === 400) {
      throw new Error(EASY_PASSWORD);
    }

    throw new Error(INTERNAL_SERVER);
  }
}
