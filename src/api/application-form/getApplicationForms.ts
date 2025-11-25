import api from "@/lib/axios";
import { APPLICATION_FORM_BASE } from "@/lib/endpoints";

export async function getApplicationForms() {
  try {
    const response = await api.get(APPLICATION_FORM_BASE);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
