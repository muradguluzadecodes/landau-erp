import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { EMAIL_LOGS_BASE, RETRY_EMAIL_LOG } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import { SUCCES_USER_EMAIL_SENT } from '@/lib/messages';

export async function emailRetry(id: string) {
  try {
    await api.post(`${EMAIL_LOGS_BASE}${id}${RETRY_EMAIL_LOG}`);
    toast.success(SUCCES_USER_EMAIL_SENT);
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
