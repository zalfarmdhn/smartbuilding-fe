import { create } from "zustand";
import waterMonitoring from "../services/water-monitoring";
import { setDataMonitoring } from "../utils/backupData";
import { AxiosError } from "axios";

interface IWaterData {
  KapasitasToren: string;
  AirKeluar: string;
  AirMasuk: string;
  VolumeSensor: string;
  UpdatedAt: string;
}

interface WaterMonitoringState {
  waterData: IWaterData | null;
  waterChart: {
    dataPenggunaanMingguan: Array<{ pipa: string; volume: number }>;
    dataPenggunaanTahunan: Array<{ pipa: string; volume: number }>;
  } | null;
  error: string | null;
  getWaterData: () => void;
}

export const useWaterMonitoring = create<WaterMonitoringState>()((set) => ({
  waterData: null,
  waterChart: null,
  error: null,
  getWaterData: async () => {
    try {
      const response = await waterMonitoring.getMonitoringAir();
      if (response instanceof AxiosError) {
        throw new Error(response.response?.data.error);
      }
      set({
        waterData: {
          KapasitasToren: response.KapasitasToren,
          AirKeluar: response.AirKeluar,
          AirMasuk: response.AirMasuk,
          VolumeSensor: response.VolumeSensor,
          UpdatedAt: response.UpdatedAt,
        },
      });
      set({
        waterChart : {
          dataPenggunaanMingguan: response.DataPenggunaanMingguan,
          dataPenggunaanTahunan: response.DataPenggunaanTahunan,
        }
      })
      setDataMonitoring(JSON.stringify(response));
    } catch (e) {
      set({ error: `${e}` });
      console.error(e);
    }
  },
}));
