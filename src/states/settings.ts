import { create } from "zustand";
import settingAPI from "../services/settings";
import { setDataUser, setIdBangunan } from "../utils/backupData";
import { useWaterMonitoring } from "./water-monitoring";
import { useElectricMonitoring } from "./electricity-monitoring";
import { getMe } from "../services/me";
import { IMeRoot } from "../types/me";
import axios from "axios";
import { IErrorAPI } from "../types/error";
import toast from "react-hot-toast";
import { ISettings } from "../types/settings";

interface ISettingsRoot {
  scheduler: number | null;
  idBangunan: number | null;
  dataUser: IMeRoot | null;
  errorMe: null | IErrorAPI;
  loading: boolean;
  settings: ISettings[];
  getSettings: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  getIdBangunanState: () => number | null;
  setIdBangunanState: (newId: number) => Promise<void>;
  deleteSetting: (id: number) => Promise<void>;
  addSetting: (
    nama_gedung: string,
    harga_listrik: number,
    haos_url: string,
    jenis_listrik: string,
    haos_token: string,
    scheduler: number,
    data_toren: IDataToren[]
  ) => Promise<void>;
  putSettings: (
    id: number,
    nama_gedung: string,
    harga_listrik: number,
    haos_url: string,
    jenis_listrik: string,
    haos_token: string,
    scheduler: number
  ) => Promise<void>;
}

interface IDataToren {
  monitoring_name: string;
  kapasitas_toren: number;
}

export const useSettings = create<ISettingsRoot>((set, get) => ({
  scheduler: null,
  dataUser: null,
  errorMe: null,
  loading: false,
  settings: [],
  idBangunan: null,
  getSettings: async () => {
    try {
      set({ loading: true });
      const response = await settingAPI.getSettings();
      set({
        scheduler: response.data[0].scheduler,
        idBangunan: response.data[0].id,
        settings: response.data,
      });
      set({ loading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        set({ errorMe: error.response?.data });
      }
      // Set different error message if it's not an AxiosError
      set({ errorMe: { message: "An unknown error occurred" } as IErrorAPI });
      console.error(error);
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await getMe();
      // set data user ke state
      set({
        dataUser: response.data,
      });
      // masukkan data user ke localStorage
      setDataUser(response.data);
    } catch (error) {
      // Handle error jika terjadi kesalahan saat mengambil data user
      if (axios.isAxiosError(error)) {
        console.error(error);
        set({ errorMe: error.response?.data as IErrorAPI });
        // return agar blok kode berikutnya tidak dieksekusi
        return;
      }
      // Set different error message if it's not an AxiosError
      set({ errorMe: { message: "An unknown error occured" } as IErrorAPI });
      console.error(error);
    }
  },
  getIdBangunanState: () => {
    return get().idBangunan;
  },
  setIdBangunanState: async (newId: number) => {
    setIdBangunan(String(newId));
    const response = await settingAPI.getSettingById(newId);
    set({ scheduler: response.data.scheduler });
    useWaterMonitoring.setState({ loading: true });
    useElectricMonitoring.setState({ loading: true });
    // Import the stores at the top of the file
    useWaterMonitoring.getState().getWaterData();
    useElectricMonitoring.getState().getElectricData();
    // await get().getSettings();
  },
  deleteSetting: async (id: number) => {
    try {
      await settingAPI.deleteSetting(id);
      toast.success("Setting berhasil dihapus!");
      await get().getSettings();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
        set({ errorMe: error.response?.data });
        // return agar blok kode berikutnya tidak dieksekusi
        return;
      }
      // Set different error message if it's not an AxiosError
      set({ errorMe: { message: "An unknown error occurred" } as IErrorAPI });
    }
  },
  addSetting: async (
    nama_gedung: string,
    harga_listrik: number,
    haos_url: string,
    jenis_listrik: string,
    haos_token: string,
    scheduler: number,
    data_toren: IDataToren[]
  ) => {
    try {
      await settingAPI.addSetting({
        nama_gedung,
        harga_listrik,
        haos_url,
        jenis_listrik,
        haos_token,
        scheduler,
        data_toren,
      });
      toast.success("Setting berhasil ditambahkan!");
      await get().getSettings();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
        set({ errorMe: error.response?.data });
        // return agar blok kode berikutnya tidak dieksekusi
        return;
      }
      // Set different error message if it's not an AxiosError
      set({ errorMe: { message: "An unknown error occurred" } as IErrorAPI });
    }
  },
  putSettings: async (
    id: number,
    nama_gedung: string,
    harga_listrik: number,
    haos_url: string,
    jenis_listrik: string,
    haos_token: string,
    scheduler: number
  ) => {
    try {
      await settingAPI.putSettings({
        id,
        nama_gedung,
        harga_listrik,
        haos_url,
        jenis_listrik,
        haos_token,
        scheduler,
      });
      toast.success("Setting berhasil diperbarui!");
      await get().getSettings();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
        set({ errorMe: error.response?.data });
        // return agar blok kode berikutnya tidak dieksekusi
        return;
      }
      // Set different error message if it's not an AxiosError
      set({ errorMe: { message: "An unknown error occurred" } as IErrorAPI });
    }
  },
}));
