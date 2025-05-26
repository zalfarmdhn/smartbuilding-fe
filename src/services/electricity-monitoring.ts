import init from ".";
import { AxiosError, AxiosResponse } from "axios";

export const getMonitoringListrik = async (
  idBangunan: number
): Promise<AxiosResponse["data"]> => {
  const response = await init.get(`/monitoring_listrik/${idBangunan}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.error);
  }
  return response.data;
};

export default { getMonitoringListrik };
