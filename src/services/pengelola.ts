import toast from "react-hot-toast";
import init from ".";
import { IPengelolaBody, IPengelolaGedung, IPengelolaGedungResponse } from "../types/pengelola";

export const getPengelolaGedung = async (): Promise<IPengelolaGedung[] | undefined> => {
  try {
    const response = await init.get("/pengelola_gedung", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postPengelolaGedung = async (
  pengelola_gedung: IPengelolaBody
): Promise<IPengelolaGedungResponse | undefined> => {
  try {
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
    toast.success("Pengelola gedung berhasil ditambahkan!");
    return response.data;
  } catch (error) {
    toast.error("Gagal menambahkan pengelola gedung. Silakan coba lagi.");
    console.error(error);
  }
}

export const putPengelolaGedung = async (id: number, pengelola_gedung: IPengelolaBody): Promise<IPengelolaGedungResponse | undefined> => {
  try {
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
    toast.success("Pengelola gedung berhasil diperbarui!");
    return response.data;
  } catch (error) {
    toast.error("Gagal memperbarui pengelola gedung. Silakan coba lagi.");
    console.error(error);
  }
}

export const deletePengelolaGedung = async (id: number): Promise<void> => {
  try {
    const response = await init.delete(`/pengelola_gedung/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Pengelola gedung berhasil dihapus!");
    return response.data;
  } catch (error) {
    toast.error("Gagal menghapus pengelola gedung. Silakan coba lagi.");
    console.error(error);
  }
}

export default { getPengelolaGedung, postPengelolaGedung, putPengelolaGedung, deletePengelolaGedung };