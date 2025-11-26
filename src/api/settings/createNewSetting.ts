// api/settings/getSettings.ts
import { toast } from 'react-toastify';

import api from '@/lib/axios';
import { POSITIONS, INSTITUTIONS, DEPARTMENTS } from '@/lib/endpoints';
import { SettingsEnum } from '@/lib/enums';
import { INTERNAL_SERVER } from '@/lib/errors';
import { SUCCESS_CREATE_SETTINGS } from '@/lib/messages';
import { SettingsVariants } from '@/lib/types';

export async function createNewSetting({
  name,
  type,
}: {
  name: string;
  type: SettingsVariants;
}) {
  const ENDPOINTS: Record<typeof type, string> = {
    positions: POSITIONS,
    institutions: INSTITUTIONS,
    departments: DEPARTMENTS,
  };

  const data = {
    name_az: name,
    name_ru: name,
    name_en: name,
  };

  try {
    await api.post(`${ENDPOINTS[type]}`, data);
    toast.success(`${SettingsEnum[type]} ${SUCCESS_CREATE_SETTINGS}`);
  } catch (err: any) {
    if (err.status === '400') {
      /*YOUR MESSAGE HERE */
    }

    toast.error(INTERNAL_SERVER);
  }
}
