import init from ".";
import { AxiosError, AxiosResponse } from 'axios';

export const getMonitoringListrik = async (idBangunan: number | null): Promise<AxiosResponse['data']> => {
  try {
    if (idBangunan === null) {
      throw new Error(`ID bangunan tidak
      ditemukan`);
    }
    const response = await init.get(`/monitoring_listrik/${idBangunan}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if(response instanceof AxiosError) {
      throw new Error(response.response?.data.error);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getMonitoringListrik };