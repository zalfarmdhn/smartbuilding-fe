import { AxiosResponse } from "axios";
import init from ".";

export const getMonitoringAir = async (): Promise<AxiosResponse['data']> => {
  try {
    const response = await init.get("/monitoring_air");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  } 
}

export default { getMonitoringAir };