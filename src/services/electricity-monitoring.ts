import init from ".";
import { AxiosError } from "axios";
import { IElectricResponse } from "../types/electricity-monitoring";
import { IResponseData } from "../types/response";

export const getMonitoringListrik = async (
  idBangunan: number
): Promise<IResponseData<IElectricResponse>> => {
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
