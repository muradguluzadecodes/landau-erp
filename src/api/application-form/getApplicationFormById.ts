import api from '@/lib/axios';
import { APPLICATION_FORM_BASE } from '@/lib/endpoints';

export async function getApplicationFormById(id: string) {
  try {
    const response = await api.get(`${APPLICATION_FORM_BASE}${id}/`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
}
