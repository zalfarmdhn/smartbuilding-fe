import { create } from "zustand";
import waterMonitoring from "../services/water-monitoring";
import { getIdBangunan, setDataMonitoring } from "../utils/backupData";
import { WaterMonitoringState } from "../types/water-monitoring";
import { useSettings } from "./settings";

export const useWaterMonitoring = create<WaterMonitoringState>()((set) => ({
  waterData: {
    nama_gedung: "",
    kapasitasToren: [],
    AirKeluar: "",
    AirMasuk: "",
    CreatedAt: "",
    UpdatedAt: "",
  },
  waterChart: {
    DataPenggunaanHarian: {},
    DataPenggunaanMingguan: {},
    DataPenggunaanBulanan: {},
    DataPenggunaanTahunan: {},
  },
  error: "",
  loading: true,
  // Fungsi untuk mengecek apakah monitoring air online atau offline
  isMonitoringOnline: () => {
    const idBangunan = parseInt(getIdBangunan() || "1");
    const indexBangunan = idBangunan - 1;
    const status =
      useSettings.getState().settings[indexBangunan]?.monitoring_status;
    return status?.[0]?.["monitoring air"] === "online";
  },
  getWaterData: async () => {
    try {
      const idBangunan = parseInt(getIdBangunan() || "1");
      const response = await waterMonitoring.getMonitoringAir(idBangunan);
      console.log(`INI RESPONSEA response`, response);
      const responseData = response.data[0];

      // Simpan data ke localStorage setiap kali berhasil fetch
      // console.log("Data monitoring air berhasil di-fetch dan disimpan");
      setDataMonitoring(JSON.stringify(responseData));

      // Cek status monitoring untuk menentukan apakah menggunakan data real-time atau backup
      const isOnline = useWaterMonitoring.getState().isMonitoringOnline();

      if (!isOnline) {
        // console.log(
        //   "Status monitoring air offline, menggunakan data backup dari localStorage"
        // );
        throw new Error(
          "Data monitoring air offline, menggunakan data dari backup."
        );
      } // Jika online, gunakan data dari API
      set({
        waterData: {
          nama_gedung: responseData.nama_gedung,
          kapasitasToren: responseData.kapasitasToren,
          AirKeluar: responseData.AirKeluar,
          AirMasuk: responseData.AirMasuk,
          CreatedAt: responseData.CreatedAt,
          UpdatedAt: responseData.UpdatedAt,
        },
      });
      set({
        waterChart: {
          DataPenggunaanHarian: responseData.DataPenggunaanHarian,
          DataPenggunaanMingguan: responseData.DataPenggunaanMingguan,
          DataPenggunaanBulanan: responseData.DataPenggunaanBulanan,
          DataPenggunaanTahunan: responseData.DataPenggunaanTahunan,
        },
      });

      set({ loading: false });
      set({ error: "" });
    } catch (error) {
      // Ambil data dari localStorage jika API gagal atau status offline
      const backupData = localStorage.getItem(
        `dataTorenAir-${getIdBangunan()}`
      ); // Jika ada data backup, gunakan data tersebut
      if (backupData) {
        const parsedData = JSON.parse(backupData);
        set({
          waterData: {
            nama_gedung: parsedData.nama_gedung || "",
            kapasitasToren: parsedData.kapasitasToren || [],
            AirKeluar: parsedData.AirKeluar || "",
            AirMasuk: parsedData.AirMasuk || "",
            CreatedAt: parsedData.CreatedAt || "",
            UpdatedAt: parsedData.UpdatedAt || "",
          },
          waterChart: {
            DataPenggunaanHarian: parsedData.DataPenggunaanHarian || {},
            DataPenggunaanMingguan: parsedData.DataPenggunaanMingguan || {},
            DataPenggunaanBulanan: parsedData.DataPenggunaanBulanan || {},
            DataPenggunaanTahunan: parsedData.DataPenggunaanTahunan || {},
          },
          error:
            "Menggunakan data tersimpan - Tolong refresh halaman untuk update",
        });
      }
      set({ loading: false });
      // console.log("debug setelah backupData");
      console.error(`ini error air`, error);
    }
  },
}));
