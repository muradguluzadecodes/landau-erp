import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import { UpdateUser, UserItem } from '@/lib/types';

export interface ChangePasswordProps {
  id: string;
  data: UpdateUser;
  func: () => void;
}

export async function updateUserInfo({
  id,
  data,
  func,
  method = 'put',
}: {
  id: string;
  data: UpdateUser | Partial<UserItem>;
  method?: 'put' | 'patch';
  func?: () => void;
}) {
  try {
    if (method === 'put') {
      await api.put(`${USER_BASE}/${id}/`, data);
      toast.success('Məlumatlar uğurla yeniləndi');
    } else {
      await api.patch(`${USER_BASE}/${id}/`, data);
      toast.success('Uğurlu əməliyyat!');
    }

    func?.();
  } catch (err: any) {
    if (err.status === 400) {
      /* LOREM */
    }

    toast.error(INTERNAL_SERVER);
  }
}
