import init from ".";
import { AxiosResponse } from 'axios';

export const getMonitoringListrik = async (): Promise<AxiosResponse['data']> => {
  try {
    const response = await init.get("/monitoring_listrik");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default { getMonitoringListrik };