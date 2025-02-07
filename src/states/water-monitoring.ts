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
  waterData: IWaterData;
  waterChart: {
    DataPenggunaanHarian: {
      [key: string]: Array<{ pipa: string; volume: string }>;
    };
    DataPenggunaanMingguan: {
      [key: string]: Array<{ pipa: string; volume: string }>;
    };
    DataPenggunaanTahunan: {
      [key: string]: Array<{ pipa: string; volume: string }>;
    };
  };
  error: string;
  getWaterData: () => Promise<void>;
}

export const useWaterMonitoring = create<WaterMonitoringState>()((set) => ({
  waterData: {
    KapasitasToren: '',
    AirKeluar: '',
    AirMasuk: '',
    VolumeSensor: '',
    UpdatedAt: '',
  },
  waterChart: {
    DataPenggunaanHarian: {},
    DataPenggunaanMingguan: {},
    DataPenggunaanTahunan: {},
  },
  error: '',
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
          DataPenggunaanHarian: response.DataPenggunaanHarian,
          DataPenggunaanMingguan: response.DataPenggunaanMingguan,
          DataPenggunaanTahunan: response.DataPenggunaanTahunan,
        }
      })
      setDataMonitoring(JSON.stringify(response));
    } catch (e) {
      set({ error: `${e}` });
      console.error(e);
    }
  },
}));
