import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { CHANGE_USER_PASSWORD, USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export interface ChangePasswordProps {
  id: string;
  data: {
    password: string;
    confirm_password: string;
  };
  func: () => void;
}

export async function changePassword({
  id,
  data,
  func,
}: {
  id: string;
  data: { password: string; confirm_password: string };
  func?: () => void;
}) {
  try {
    await api.post(`${USER_BASE}/${id}${CHANGE_USER_PASSWORD}`, data);

    toast.success('Şifrə uğurla yeniləndi');

    func?.();
  } catch (err: any) {
    if (err.status === 400) {
      /* LOREM */
    }

    toast.error(INTERNAL_SERVER);
  }
}
