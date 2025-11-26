// api/settings/getSettings.ts
import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { POSITIONS, INSTITUTIONS, DEPARTMENTS } from '@/lib/endpoints';
import { INTERNAL_SERVER } from '@/lib/errors';
import {
  SUCCESS_DELETE_SETTINGS,
  SUCCESS_UPDATE_SETTINGS,
} from '@/lib/messages';
import { SettingRowActions, SettingsVariants } from '@/lib/types';

export interface UpdateSettingsProps {
  type: SettingsVariants;
  data: {
    name_az: string | null | undefined;
    name_ru: string | null | undefined;
    name_en: string | null | undefined;
  };
  id: string | number;
  action: SettingRowActions;
}

export async function updateAndDeleteSettings({
  type,
  data,
  id,
  action,
}: UpdateSettingsProps) {
  const ENDPOINTS: Record<typeof type, string> = {
    positions: POSITIONS,
    institutions: INSTITUTIONS,
    departments: DEPARTMENTS,
  };

  try {
    if (action === 'update') {
      await api.patch(`${ENDPOINTS[type]}${id}/`, data);
      toast.success(SUCCESS_UPDATE_SETTINGS);
    }

    if (action === 'delete') {
      await api.delete(`${ENDPOINTS[type]}${id}/`);
      toast.success(SUCCESS_DELETE_SETTINGS);
    }
  } catch (err: any) {
    if (err.status === '400') {
      /*YOUR MESSAGE HERE */
    }

    toast.error(INTERNAL_SERVER);
  }
}
