import { AxiosError, AxiosResponse } from "axios";
import init from ".";

export const getMonitoringAir = async (): Promise<AxiosResponse['data']> => {
  try {
    const response = await init.get("/monitoring_air", {
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
    return error;
  } 
}

export default { getMonitoringAir };