import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { USER_BASE, USER_SEND_EMAIL } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import { SUCCES_USER_EMAIL_SENT } from '@/lib/messages';

export async function sendEmail(id: string) {
  try {
    await api.post(`${USER_BASE}/${id}${USER_SEND_EMAIL}`);
    toast.success(SUCCES_USER_EMAIL_SENT);
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
