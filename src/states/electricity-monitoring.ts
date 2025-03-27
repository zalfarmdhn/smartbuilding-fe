import { create } from "zustand";
import electricityMonitoring from "../services/electricity-monitoring";
import { getIdBangunan, setDataListrik } from "../utils/backupData";
import { AxiosError } from "axios";
// import { useSettings } from "./settings";


interface IBiayaPemakaian {
  Nama: string;
  Biaya: string;
}

interface IDayaListrik {
  nama: string,
  Value: string
}

type Hari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";

type Minggu = "Minggu 1" | "Minggu 2" | "Minggu 3" | "Minggu 4" | "Minggu 5";

type Bulan = "Januari" | "Februari" | "Maret" | "April" | "Mei" | "Juni" | "Juli" | 
       "Agustus" | "September" | "Oktober" | "November" | "Desember";

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
  DataPenggunaanListrikTahunan: {
    [key in Bulan]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikTahunan: {
    [key in Bulan]: Array<{ Nama: string; Biaya: string }>;
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
      "Minggu 1": [],
      "Minggu 2": [],
      "Minggu 3": [],
      "Minggu 4": [],
      "Minggu 5": [],
    },
    DataBiayaListrikMingguan: {
      "Minggu 1": [],
      "Minggu 2": [],
      "Minggu 3": [],
      "Minggu 4": [],
      "Minggu 5": [],
    },
    DataPenggunaanListrikTahunan: {
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
    DataBiayaListrikTahunan: {
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
    }
  },
  error: "",
  loading: true,
  getElectricData: async () => {
    try {
      // set({ loading: true });
      // const idBangunan = (await getSettings()).id;
      const idBangunan = parseInt(getIdBangunan() || "1");
      const response = await electricityMonitoring.getMonitoringListrik(idBangunan);
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
          DataPenggunaanListrikTahunan: response.DataPenggunaanListrikTahunan,
          DataBiayaListrikTahunan: response.DataBiayaListrikTahunan,
        },
      });
      setDataListrik(JSON.stringify(response));
      set({ loading: false });
      set({ error: '' });
    } catch (e) {
      set({ error: `${e}` });
      console.error(e);
      set({ loading: false });
    }
  },
}));
