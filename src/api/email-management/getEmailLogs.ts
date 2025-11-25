import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { BASE_EMAIL_LOGS } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export async function getEmailLogs(params: {
  page: number;
  page_size: number;
  is_succeeded?: boolean;
}) {
  try {
    const res = await api.get(BASE_EMAIL_LOGS, { params });
    return res.data;
  } catch (err: any) {
    toast.error(INTERNAL_SERVER);
    throw err;
  }
}
