import init from ".";
import { AxiosResponse } from "axios";

export const getMonitoringListrik = async (
  idBangunan: number
): Promise<AxiosResponse["data"]> => {
  const response = await init.get(`/monitoring_listrik/${idBangunan}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export default { getMonitoringListrik };
