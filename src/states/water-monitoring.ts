import { create } from "zustand";
import waterMonitoring from "../services/water-monitoring";
import { getIdBangunan, setDataMonitoring } from "../utils/backupData";
import axios, { AxiosError } from "axios";
import { IErrorAPI } from "../types/error";

interface IWaterData {
  KapasitasToren: IKapasitasToren[];
  AirKeluar: string;
  AirMasuk: string;
  UpdatedAt: string;
}

interface IKapasitasToren {
  nama: string;
  kapasitas: string;
  kapasitas_toren: string;
  volume_sensor: string;
  created_at: string;
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
    DataPenggunaanBulanan: {
      [key: string]: Array<{ pipa: string; volume: string }>;
    };
    DataPenggunaanTahunan: {
      [key: string]: Array<{ pipa: string; volume: string }>;
    };
  };
  error: IErrorAPI | string;
  loading: boolean;
  getWaterData: () => Promise<void>;
}

export const useWaterMonitoring = create<WaterMonitoringState>()((set) => ({
  waterData: {
    KapasitasToren: [],
    AirKeluar: '',
    AirMasuk: '',
    UpdatedAt: '',
  },
  waterChart: {
    DataPenggunaanHarian: {},
    DataPenggunaanMingguan: {},
    DataPenggunaanBulanan: {},
    DataPenggunaanTahunan: {},
  },
  error: '',
  loading: true,
  getWaterData: async () => {
    try {
      // set({ loading: true });
      // const idBangunan = useSettings.getState().idBangunan;
      const idBangunan = parseInt(getIdBangunan() || "1"); // fix later, might be incorrect
      const response = await waterMonitoring.getMonitoringAir(idBangunan);
      if (response instanceof AxiosError) {
        throw new Error(response.response?.data.error);
      }
      set({
        waterData: {
          KapasitasToren: response.kapasitasToren,
          AirKeluar: response.AirKeluar,
          AirMasuk: response.AirMasuk,
          UpdatedAt: response.UpdatedAt,
        },
      });
      set({
        waterChart : {
          DataPenggunaanHarian: response.DataPenggunaanHarian,
          DataPenggunaanMingguan: response.DataPenggunaanMingguan,
          DataPenggunaanBulanan: response.DataPenggunaanBulanan || response.DataPenggunaanTahunan, // Gunakan DataPenggunaanTahunan jika DataPenggunaanBulanan tidak tersedia
          DataPenggunaanTahunan: response.DataPenggunaanTahunan,
        }
      })
      setDataMonitoring(JSON.stringify(response));
      set({ loading: false });
      set({ error: '' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        set({ error: error.response?.data });
      }
      // Set different error message if it's not an AxiosError
      set({ error: { message: "An unknown error occurred" } as IErrorAPI });
      set({ loading: false });
    }
  },
}));