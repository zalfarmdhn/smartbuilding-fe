import init from ".";
import { AxiosError, AxiosResponse } from 'axios';

export const getMonitoringListrik = async (): Promise<AxiosResponse['data']> => {
  try {
    const response = await init.get("/monitoring_listrik", {
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
};

export default { getMonitoringListrik };