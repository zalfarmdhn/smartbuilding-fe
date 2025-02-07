import { create } from "zustand";
import electricityMonitoring from "../services/electricity-monitoring";
import { setDataListrik } from "../utils/backupData";
import { AxiosError } from "axios";

interface IElectricData {
  TotalWatt: string;
  TotalDayaListrikLT1: string;
  TotalDayaListrikLT2: string;
  TotalDayaListrikLT3: string;
  TotalDayaListrikLT4: string;
  BiayaPemakaianLT1: string;
  BiayaPemakaianLT2: string;
  BiayaPemakaianLT3: string;
  BiayaPemakaianLT4: string;
  UpdatedAt: string;
}

interface ElectricMonitorState {
  electricData: IElectricData;
  electricChart: {
    DataBiayaListrikHarian: {
      [key: string]: Array<{ Lantai: string; Biaya: string }>;
    };
    DataBiayaListrikMingguan: {
      [key: string]: Array<{ Lantai: string; Biaya: string }>;
    };
    DataBiayaListrikTahunan: {
      [key: string]: Array<{ Lantai: string; Biaya: string }>;
    };
  };
  error: string;
  getElecticData: () => void;
}

export const useElectricMonitoring = create<ElectricMonitorState>()((set) => ({
  electricData: {
    TotalWatt: "",
    TotalDayaListrikLT1: "",
    TotalDayaListrikLT2: "",
    TotalDayaListrikLT3: "",
    TotalDayaListrikLT4: "",
    BiayaPemakaianLT1: "",
    BiayaPemakaianLT2: "",
    BiayaPemakaianLT3: "",
    BiayaPemakaianLT4: "",
    UpdatedAt: "",
  },
  electricChart: {
    DataBiayaListrikHarian: {},
    DataBiayaListrikMingguan: {},
    DataBiayaListrikTahunan: {},
  },
  error: "",
  getElecticData: async () => {
    try {
      const response = await electricityMonitoring.getMonitoringListrik();
      if (response instanceof AxiosError) {
        throw new Error(response.response?.data.error);
      }
      set({
        electricData: {
          TotalWatt: response.TotalWatt,
          TotalDayaListrikLT1: response.TotalDayaListrikLT1,
          TotalDayaListrikLT2: response.TotalDayaListrikLT2,
          TotalDayaListrikLT3: response.TotalDayaListrikLT3,
          TotalDayaListrikLT4: response.TotalDayaListrikLT4,
          BiayaPemakaianLT1: response.BiayaPemakaianLT1,
          BiayaPemakaianLT2: response.BiayaPemakaianLT2,
          BiayaPemakaianLT3: response.BiayaPemakaianLT3,
          BiayaPemakaianLT4: response.BiayaPemakaianLT4,
          UpdatedAt: response.UpdatedAt,
        },
      });
      set({
        electricChart: {
          DataBiayaListrikHarian: response.DataBiayaListrikHarian,
          DataBiayaListrikMingguan: response.DataBiayaListrikMingguan,
          DataBiayaListrikTahunan: response.DataBiayaListrikTahunan,
        },
      });
      setDataListrik(JSON.stringify(response));
    } catch (e) {
      set({ error: `${e}` });
      console.error(e);
    }
  },
}));
