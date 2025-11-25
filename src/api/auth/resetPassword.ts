import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { RESET_PASSWORD } from '@/lib/endpoints';
import { EASY_PASSWORD, INTERNAL_SERVER } from '@/lib/errors';
import { SUCCESS_RESET_PASSWORD } from '@/lib/messages';

export interface ResetPasswordData {
  password: string;
  uid: string;
  token: string;
}

export async function resetPassword(data: ResetPasswordData, func: () => void) {
  try {
    await api.post(RESET_PASSWORD, data);
    toast.success(SUCCESS_RESET_PASSWORD);

    if (func) func();
  } catch (err: any) {
    if (err.status === 400) {
      throw new Error(EASY_PASSWORD);
    }

    throw new Error(INTERNAL_SERVER);
  }
}
