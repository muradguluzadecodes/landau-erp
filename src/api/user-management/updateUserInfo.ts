import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import { UpdateUser } from '@/lib/types';

export interface ChangePasswordProps {
  id: string;
  data: UpdateUser;
  func: () => void;
}

export async function updateUserInfo({
  id,
  data,
  func,
}: {
  id: string;
  data: UpdateUser;
  func?: () => void;
}) {
  try {
    console.log('UPDATE DATA');
    await api.put(`${USER_BASE}/${id}/`, data);

    toast.success('Məlumatlar uğurla yeniləndi');

    func?.();
  } catch (err: any) {
    if (err.status === 400) {
      /* LOREM */
    }

    toast.error(INTERNAL_SERVER);
  }
}
