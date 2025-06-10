import { create } from "zustand";
import electricityMonitoring from "../services/electricity-monitoring";
import { getIdBangunan, setDataListrik } from "../utils/backupData";
import { ElectricMonitorState } from "../types/electricity-monitoring";
import { useSettings } from "./settings";

export const useElectricMonitoring = create<ElectricMonitorState>()((set) => ({
  electricData: {
    nama_gedung: "",
    TotalWatt: "",
    TotalDayaListrik: [],
    BiayaPemakaian: [],
    CreatedAt: "",
    UpdatedAt: "",
  },
  electricChart: {
    DataPenggunaanListrikHarian: {},
    DataBiayaListrikHarian: {},
    DataPenggunaanListrikMingguan: {},
    DataBiayaListrikMingguan: {},
    DataPenggunaanListrikBulanan: {},
    DataBiayaListrikBulanan: {},
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
      ); // Handle direct response structure
      const responseData = response.data;

      // Simpan data ke localStorage setiap kali berhasil fetch
      // console.log("Data monitoring listrik berhasil di-fetch dan disimpan");
      setDataListrik(JSON.stringify(responseData));

      // Cek status monitoring untuk menentukan apakah menggunakan data real-time atau backup
      const isOnline = useElectricMonitoring.getState().isMonitoringOnline();

      if (!isOnline) {
        // console.log(
        //   "Status monitoring listrik offline, menggunakan data backup dari localStorage"
        // );
        throw new Error(
          "Data monitoring listrik offline, menggunakan data dari backup."
        );
      } // Jika online, gunakan data dari API
      set({
        electricData: {
          nama_gedung: responseData.nama_gedung,
          TotalWatt: responseData.TotalWatt,
          TotalDayaListrik: responseData.TotalDayaListrik,
          BiayaPemakaian: responseData.BiayaPemakaian,
          CreatedAt: responseData.CreatedAt,
          UpdatedAt: responseData.UpdatedAt,
        },
        electricChart: {
          DataPenggunaanListrikHarian: responseData.DataPenggunaanListrikHarian,
          DataBiayaListrikHarian: responseData.DataBiayaListrikHarian,
          DataPenggunaanListrikMingguan:
            responseData.DataPenggunaanListrikMingguan,
          DataBiayaListrikMingguan: responseData.DataBiayaListrikMingguan,
          DataPenggunaanListrikBulanan:
            responseData.DataPenggunaanListrikBulanan,
          DataBiayaListrikBulanan: responseData.DataBiayaListrikBulanan,
          DataPenggunaanListrikTahunan:
            responseData.DataPenggunaanListrikTahunan,
          DataBiayaListrikTahunan: responseData.DataBiayaListrikTahunan,
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
            nama_gedung: parsedData.nama_gedung || "",
            TotalWatt: parsedData.TotalWatt || "",
            TotalDayaListrik: parsedData.TotalDayaListrik || [],
            BiayaPemakaian: parsedData.BiayaPemakaian || [],
            CreatedAt: parsedData.CreatedAt || "",
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
