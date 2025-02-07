/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import init from "."

export interface ISettings {
  id: number;
  haos_url: string;
  haos_token: string;
  scheduler: number;
}

export const getSettings = async (): Promise<ISettings> => {
  try {
    const response = await init.get("/setting/1", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      id: 1,
      haos_url: '',
      haos_token: '',
      scheduler: 0
    };
  }
}


export const putSettings = async (haos_url: string, haos_token: string, scheduler: number): Promise<ISettings> => {
  try {
    const response = await init.put("/setting/1", {
      id: 1,
      haos_url: haos_url,
      haos_token: haos_token,
      scheduler: parseInt(scheduler as unknown as string)
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default { getSettings, putSettings };