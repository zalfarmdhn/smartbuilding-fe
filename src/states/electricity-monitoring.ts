import { create } from "zustand";
import electricityMonitoring from "../services/electricity-monitoring";
import { getIdBangunan, setDataListrik } from "../utils/backupData";
import { ElectricMonitorState } from "../types/electricity-monitoring";
import { useSettings } from "./settings";

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
  // Fungsi untuk mengecek apakah monitoring listrik online atau offline
  isMonitoringOnline: () => {
    const idBangunan = parseInt(getIdBangunan() || "1");
    const indexBangunan = idBangunan - 1;
    const status =
      useSettings.getState().settings[indexBangunan]?.monitoring_status;
    return status?.[1]?.["monitoring listrik"] === "online";
  },
  getElectricData: async () => {
    try {
      const idBangunan = parseInt(getIdBangunan() || "1");
      const response = await electricityMonitoring.getMonitoringListrik(
        idBangunan
      );

      // Simpan data ke localStorage setiap kali berhasil fetch
      // console.log("Data monitoring listrik berhasil di-fetch dan disimpan");
      setDataListrik(JSON.stringify(response));

      // Cek status monitoring untuk menentukan apakah menggunakan data real-time atau backup
      const isOnline = useElectricMonitoring.getState().isMonitoringOnline();

      if (!isOnline) {
        // console.log(
        //   "Status monitoring listrik offline, menggunakan data backup dari localStorage"
        // );
        throw new Error(
          "Data monitoring listrik offline, menggunakan data dari backup."
        );
      }

      // Jika online, gunakan data dari API
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

      set({ loading: false });
      set({ error: "" });
    } catch (error) {
      // Ambil data dari localStorage jika API gagal
      const backupData = localStorage.getItem(`dataListrik-${getIdBangunan()}`);
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
            DataBiayaListrikMingguan: parsedData.DataBiayaListrikMingguan || {},
            DataPenggunaanListrikBulanan:
              parsedData.DataPenggunaanListrikBulanan || {},
            DataBiayaListrikBulanan: parsedData.DataBiayaListrikBulanan || {},
            DataPenggunaanListrikTahunan:
              parsedData.DataPenggunaanListrikTahunan || {},
            DataBiayaListrikTahunan: parsedData.DataBiayaListrikTahunan || {},
          },
          error:
            "Menggunakan data tersimpan - Tolong refresh halaman untuk update",
        });
      }
      set({ loading: false });
      console.error(`ini error listrik`, error);
    }
  },
}));
