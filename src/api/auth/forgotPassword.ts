import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { FORGOT_PASSWORD } from '@/lib/endpoints';
import { INTERNAL_SERVER, INVALID_EMAIL } from '@/lib/errors';
import { SUCCESS_SENT_EMAIL_LINK } from '@/lib/messages';

export async function forgotPassword(data: { email: string }) {
  try {
    await api.post(FORGOT_PASSWORD, data);
    toast.success(SUCCESS_SENT_EMAIL_LINK);
  } catch (err: any) {
    if (err.status === 400) {
      throw new Error(INVALID_EMAIL);
    }

    throw new Error(INTERNAL_SERVER);
  }
}
