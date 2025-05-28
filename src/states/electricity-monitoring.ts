import { create } from "zustand";
import electricityMonitoring from "../services/electricity-monitoring";
import { getIdBangunan, setDataListrik } from "../utils/backupData";
import axios from "axios";
import { ElectricMonitorState } from "../types/electricity-monitoring";

export const useElectricMonitoring = create<ElectricMonitorState>()((set) => ({
  electricData: {
    namaGedung: "",
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
      const idBangunan = parseInt(getIdBangunan() || "1");
      const response = await electricityMonitoring.getMonitoringListrik(
        idBangunan
      );
      const dataListrikBackup = JSON.parse(
        localStorage.getItem("dataListrik") || "{}"
      );
      if (response.TotalWatt === dataListrikBackup.TotalWatt) {
        console.log("Data monitor listrik gagal disimpan");
        throw new Error(
          "Data monitoring listrik tidak berubah, menggunakan data dari backup."
        );
      }
      set({
        electricData: {
          namaGedung: response.nama_gedung,
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
      // Simpan data listrik ke localStorage
      setDataListrik(JSON.stringify(response));
      set({ loading: false });
      set({ error: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        // Ambil data dari localStorage jika API gagal
        const backupData = localStorage.getItem("dataListrik");
        if (backupData) {
          const parsedData = JSON.parse(backupData);
          set({
            electricData: {
              namaGedung: parsedData.nama_gedung || "",
              TotalWatt: parsedData.TotalWatt || "",
              TotalDayaListrik: parsedData.TotalDayaListrik || [],
              BiayaPemakaian: parsedData.BiayaPemakaian || [],
              UpdatedAt: parsedData.UpdatedAt || "",
            },
            electricChart: {
              DataPenggunaanListrikHarian:
                parsedData.DataPenggunaanListrikHarian || {},
              DataBiayaListrikHarian: parsedData.DataBiayaListrikHarian || {},
              DataPenggunaanListrikMingguan:
                parsedData.DataPenggunaanListrikMingguan || {},
              DataBiayaListrikMingguan:
                parsedData.DataBiayaListrikMingguan || {},
              DataPenggunaanListrikBulanan:
                parsedData.DataPenggunaanListrikBulanan || {},
              DataBiayaListrikBulanan: parsedData.DataBiayaListrikBulanan || {},
              DataPenggunaanListrikTahunan:
                parsedData.DataPenggunaanListrikTahunan || {},
              DataBiayaListrikTahunan: parsedData.DataBiayaListrikTahunan || {},
            },
            loading: false,
            error: "Menggunakan data tersimpan - Koneksi API gagal",
          });
        } else {
          set({ error: `${error}`, loading: false });
        }
        throw new Error(error.response?.data.error);
      }
      // Jika bukan error dari Axios, set error umum
      console.error(`ini error blok luar axios iserror`, error);
      set({ error: `${error}`, loading: false });
    }
  },
}));