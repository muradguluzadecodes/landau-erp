import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import { SUCCES_USER_CREATED } from '@/lib/messages';
import { CreateUserFormValues } from '@/lib/types';

export async function createUser(data: CreateUserFormValues) {
  try {
    await api.post(`${USER_BASE}/`, data);
    toast.success(SUCCES_USER_CREATED);
  } catch (err: any) {
    if (err.status === 400) {
      //   throw new Error(EASY_PASSWORD);
    }

    toast.error(INTERNAL_SERVER);
  }
}
