import { AxiosError, AxiosResponse } from "axios";
import init from ".";

export const getMonitoringAir = async (idBangunan: number | null): Promise<AxiosResponse['data']> => {
  try {
    if (idBangunan === null) {
      throw new Error(`ID bangunan tidak ditemukan`);
    }
    const response = await init.get(`/monitoring_air/${idBangunan}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if(response instanceof AxiosError) {
      throw new Error(response.response?.data.error);
    }
    return response.data[0];
  } catch (error) {
    console.error(error);
  } 
}

export default { getMonitoringAir };