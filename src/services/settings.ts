import init from ".";
import { IResponse, IResponseData } from "../types/response";
import { IAddSettings, IAddTorenSuccess, ISettings } from "../types/settings";

export interface IRootSettings {
  settings: ISettings[];
}

export const getSettings = async (): Promise<IResponseData<ISettings[]>> => {
  const response = await init.get("/setting", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getSettingById = async (
  id: number
): Promise<IResponseData<ISettings>> => {
  const response = await init.get(`/setting/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const putSettings = async ({
  id,
  nama_gedung,
  harga_listrik,
  jenis_listrik,
  haos_url,
  haos_token,
  scheduler,
}: ISettings): Promise<IResponseData<ISettings>> => {
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

const addSetting = async ({
  nama_gedung,
  harga_listrik,
  jenis_listrik,
  haos_url,
  haos_token,
  scheduler,
  data_toren,
}: IAddSettings): Promise<IResponseData<IAddTorenSuccess>> => {
  const response = await init.post(
    "/setting",
    {
      nama_gedung: nama_gedung,
      harga_listrik: harga_listrik,
      jenis_listrik: jenis_listrik,
      haos_url: haos_url,
      haos_token: haos_token,
      scheduler: scheduler,
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

const deleteSetting = async (id: number): Promise<IResponse> => {
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
