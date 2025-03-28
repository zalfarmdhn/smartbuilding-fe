import { create } from "zustand";
import settingAPI from "../services/settings";
import { setIdBangunan } from "../utils/backupData";
import { useWaterMonitoring } from "./water-monitoring";
import { useElectricMonitoring } from "./electricity-monitoring";

interface ISettingsRoot {
  scheduler: number | null;
  idBangunan: number | null;
  loading: boolean;
  settings: {
    id: number;
    nama_gedung: string;
    haos_url: string;
    haos_token: string;
    scheduler: number;
    harga_listrik: number;
    jenis_listrik: string;
  } | null;
  getSettings: () => Promise<void>;
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
}

interface IDataToren {
  monitoring_name: string;
  kapasitas_toren: number;
}

export const useSettings = create<ISettingsRoot>((set, get) => ({
  scheduler: null,
  loading: false,
  settings: null,
  idBangunan: null,
  getSettings: async () => {
    try {
      set({ loading: true });
      const response = await settingAPI.getSettings();
      set({
        scheduler: response[0].scheduler,
        idBangunan: response[0].id,
        settings: response,
      });
      set({ loading: false });
    } catch (e) {
      console.error(e);
    }
  },
  // setSchedulerById: async (id: number) => {
  //   set({ loading: true });

  //   set({ loading: false });
  // },
  getIdBangunanState: () => {
    return get().idBangunan;
  },
  setIdBangunanState: async (newId: number) => {
    setIdBangunan(String(newId));
    const response = await settingAPI.getSettingById(newId);
    set({ scheduler: response.scheduler });
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
      await get().getSettings();
    } catch (e) {
      console.error(e);
    }
  },
  addSetting: async (
    nama_gedung: string,
    harga_listrik: number,
    haos_url: string,
    jenis_listrik: string,
    haos_token: string,
    scheduler: number,
    data_toren: IDataToren[],
  ) => {
    try {
      await settingAPI.addSetting(
        nama_gedung,
        harga_listrik,
        haos_url,
        jenis_listrik,
        haos_token,
        scheduler,
        data_toren
      );
      await get().getSettings();
    } catch (e) {
      console.error(e);
    }
  },
}));
