import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { USER_BASE } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';

export interface GetAllUsersParams {
  assigned_permission__custom_permission?: number | null;
  created_at_after?: string | null;
  created_at_before?: string | null;
  department?: number | null;
  educational_institution?: number | null;
  is_active?: boolean | null;
  is_staff?: boolean | null;
  ordering?: string | null;
  page?: number;
  page_size?: number;
  position?: number | null;
  search?: string | null;
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    const res = await api.get(USER_BASE, { params });

    return res.data;
  } catch (err: any) {
    if (err.status === 400) {
      //
    }
    toast.error(INTERNAL_SERVER);
  }
}
