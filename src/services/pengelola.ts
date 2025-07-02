import { AxiosError } from "axios";
import init from ".";
import {
  IPengelolaBody,
  IPengelolaGedung,
  IPengelolaGedungResponse,
} from "../types/pengelola";
import { IResponse, IResponseData } from "../types/response";

export const getPengelolaGedung = async (): Promise<
  IResponseData<IPengelolaGedung[]> | undefined
> => {
  const response = await init.get("/pengelola_gedung", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const postPengelolaGedung = async (
  pengelola_gedung: IPengelolaBody
): Promise<IResponseData<IPengelolaGedungResponse> | undefined> => {
  const response = await init.post(
    "/pengelola_gedung",
    {
      id_user: pengelola_gedung.id_user,
      id_setting: pengelola_gedung.id_setting,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.error);
  }
  return response.data;
};

export const putPengelolaGedung = async (
  id: number,
  pengelola_gedung: IPengelolaBody
): Promise<IResponseData<IPengelolaGedungResponse> | undefined> => {
  const response = await init.put(
    `/pengelola_gedung/${id}`,
    {
      id_user: pengelola_gedung.id_user,
      id_setting: pengelola_gedung.id_setting,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.error);
  }
  return response.data;
};

export const deletePengelolaGedung = async (id: number): Promise<IResponse> => {
  const response = await init.delete(`/pengelola_gedung/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.error);
  }
  return response.data;
};

export default {
  getPengelolaGedung,
  postPengelolaGedung,
  putPengelolaGedung,
  deletePengelolaGedung,
};
