import { create } from "zustand";
import electricityMonitoring from "../services/electricity-monitoring";
import { getIdBangunan, setDataListrik } from "../utils/backupData";
import { AxiosError } from "axios";
import {
  BULAN_CONSTANT,
  HARI_CONSTANT,
  MINGGU_CONSTANT,
} from "../utils/dateConstants";
// import { useSettings } from "./settings";

interface IBiayaPemakaian {
  Nama: string;
  Biaya: string;
}

interface IDayaListrik {
  nama: string;
  Value: string;
}

// Change an array of strings to a union type
type Hari = (typeof HARI_CONSTANT)[number];
type Minggu = (typeof MINGGU_CONSTANT)[number];
type Bulan = (typeof BULAN_CONSTANT)[number];

interface IElectricData {
  TotalWatt: string;
  TotalDayaListrik: IDayaListrik[];
  BiayaPemakaian: IBiayaPemakaian[];
  UpdatedAt: string;
}

interface IElectricChart {
  DataPenggunaanListrikHarian: {
    [key in Hari]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikHarian: {
    [key in Hari]: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikMingguan: {
    [key in Minggu]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikMingguan: {
    [key in Minggu]: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikBulanan: {
    [key in Bulan]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikBulanan: {
    [key in Bulan]: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikTahunan: {
    [key: string]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikTahunan: {
    [key: string]: Array<{ Nama: string; Biaya: string }>;
  };
}

interface ElectricMonitorState {
  electricData: IElectricData;
  electricChart: IElectricChart;
  error: string;
  loading: boolean;
  getElectricData: () => void;
}

export const useElectricMonitoring = create<ElectricMonitorState>()((set) => ({
  electricData: {
    TotalWatt: "",
    TotalDayaListrik: [],
    BiayaPemakaian: [],
    UpdatedAt: "",
  },
  electricChart: {
    DataPenggunaanListrikHarian: {
      Senin: [],
      Selasa: [],
      Rabu: [],
      Kamis: [],
      Jumat: [],
      Sabtu: [],
      Minggu: [],
    },
    DataBiayaListrikHarian: {
      Senin: [],
      Selasa: [],
      Rabu: [],
      Kamis: [],
      Jumat: [],
      Sabtu: [],
      Minggu: [],
    },
    DataPenggunaanListrikMingguan: {
      "Minggu ke-1": [],
      "Minggu ke-2": [],
      "Minggu ke-3": [],
      "Minggu ke-4": [],
      "Minggu ke-5": [],
    },
    DataBiayaListrikMingguan: {
      "Minggu ke-1": [],
      "Minggu ke-2": [],
      "Minggu ke-3": [],
      "Minggu ke-4": [],
      "Minggu ke-5": [],
    },
    DataPenggunaanListrikBulanan: {
      Januari: [],
      Februari: [],
      Maret: [],
      April: [],
      Mei: [],
      Juni: [],
      Juli: [],
      Agustus: [],
      September: [],
      Oktober: [],
      November: [],
      Desember: [],
    },
    DataBiayaListrikBulanan: {
      Januari: [],
      Februari: [],
      Maret: [],
      April: [],
      Mei: [],
      Juni: [],
      Juli: [],
      Agustus: [],
      September: [],
      Oktober: [],
      November: [],
      Desember: [],
    },
    DataPenggunaanListrikTahunan: {},
    DataBiayaListrikTahunan: {},
  },
  error: "",
  loading: true,
  getElectricData: async () => {
    try {
      // set({ loading: true });
      // const idBangunan = (await getSettings()).id;
      const idBangunan = parseInt(getIdBangunan() || "1");
      const response = await electricityMonitoring.getMonitoringListrik(
        idBangunan
      );
      if (response instanceof AxiosError) {
        throw new Error(response.response?.data.error);
      }
      set({
        electricData: {
          TotalWatt: response.TotalWatt,
          TotalDayaListrik: response.TotalDayaListrik,
          BiayaPemakaian: response.BiayaPemakaian,
          UpdatedAt: response.UpdatedAt,
        },
        electricChart: {
          DataPenggunaanListrikHarian: response.DataPenggunaanListrikHarian,
          DataBiayaListrikHarian: response.DataBiayaListrikHarian,
          DataPenggunaanListrikMingguan: response.DataPenggunaanListrikMingguan,
          DataBiayaListrikMingguan: response.DataBiayaListrikMingguan,
          DataPenggunaanListrikBulanan: response.DataPenggunaanListrikBulanan,
          DataBiayaListrikBulanan: response.DataBiayaListrikBulanan,
          DataPenggunaanListrikTahunan: response.DataPenggunaanListrikTahunan,
          DataBiayaListrikTahunan: response.DataBiayaListrikTahunan,
        },
      });
      setDataListrik(JSON.stringify(response));
      set({ loading: false });
      set({ error: "" });
    } catch (e) {
      set({ error: `${e}` });
      console.error(e);
      set({ loading: false });
    }
  },
}));