import init from ".";
import { IAddSettings } from "../types/settings";

export interface ISettings {
  id: number;
  nama_gedung: string;
  harga_listrik: number;
  jenis_listrik: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
}

export interface IRootSettings {
  settings: ISettings[];
}

export const getSettings = async () => {
  const response = await init.get("/setting", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getSettingById = async (id: number) => {
  const response = await init.get(`/setting/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const putSettings = async (
  id: number,
  nama_gedung: string,
  harga_listrik: number,
  haos_url: string,
  jenis_listrik: string,
  haos_token: string,
  scheduler: number
): Promise<ISettings> => {
  const response = await init.put(
    `/setting/${id}`,
    {
      id: id,
      nama_gedung: nama_gedung,
      harga_listrik: harga_listrik,
      jenis_listrik: jenis_listrik,
      haos_url: haos_url,
      haos_token: haos_token,
      scheduler: parseInt(scheduler as unknown as string),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const addSetting = async (
  nama_gedung: string,
  harga_listrik: number,
  haos_url: string,
  jenis_listrik: string,
  haos_token: string,
  scheduler: number,
  data_toren: { monitoring_name: string; kapasitas_toren: number }[]
): Promise<IAddSettings> => {
  const response = await init.post(
    "/setting",
    {
      nama_gedung: nama_gedung,
      harga_listrik: harga_listrik,
      jenis_listrik: jenis_listrik,
      haos_url: haos_url,
      haos_token: haos_token,
      scheduler: parseInt(scheduler as unknown as string),
      data_toren: data_toren,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const deleteSetting = async (id: number) => {
  const response = await init.delete(`/setting/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export default {
  getSettings,
  putSettings,
  addSetting,
  deleteSetting,
  getSettingById,
};
