import { AxiosError } from "axios";
import init from ".";
import { IWaterResponse } from "../types/water-monitoring";
import { IResponseData } from "../types/response";

export const getMonitoringAir = async (
  idBangunan: number
): Promise<IResponseData<IWaterResponse[]>> => {
  const response = await init.get(`/monitoring_air/${idBangunan}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.error);
  }
  return response.data;
};

export default { getMonitoringAir };
