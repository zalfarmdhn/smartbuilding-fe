import { create } from "zustand";
import waterMonitoring from "../services/water-monitoring";
import { getIdBangunan, setDataMonitoring } from "../utils/backupData";
import { WaterMonitoringState } from "../types/water-monitoring";
import { useSettings } from "./settings";

export const useWaterMonitoring = create<WaterMonitoringState>()((set) => ({
  waterData: {
    namaGedung: "",
    KapasitasToren: [],
    AirKeluar: "",
    AirMasuk: "",
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

      // Simpan data ke localStorage setiap kali berhasil fetch
      console.log("Data monitoring air berhasil di-fetch dan disimpan");
      setDataMonitoring(JSON.stringify(response));

      // Cek status monitoring untuk menentukan apakah menggunakan data real-time atau backup
      const isOnline = useWaterMonitoring.getState().isMonitoringOnline();

      if (!isOnline) {
        console.log(
          "Status monitoring air offline, menggunakan data backup dari localStorage"
        );
        throw new Error(
          "Data monitoring air offline, menggunakan data dari backup."
        );
      }

      // Jika online, gunakan data dari API
      set({
        waterData: {
          namaGedung: response.nama_gedung,
          KapasitasToren: response.kapasitasToren,
          AirKeluar: response.AirKeluar,
          AirMasuk: response.AirMasuk,
          UpdatedAt: response.UpdatedAt,
        },
      });
      set({
        waterChart: {
          DataPenggunaanHarian: response.DataPenggunaanHarian,
          DataPenggunaanMingguan: response.DataPenggunaanMingguan,
          DataPenggunaanBulanan:
            response.DataPenggunaanBulanan || response.DataPenggunaanTahunan,
          DataPenggunaanTahunan: response.DataPenggunaanTahunan,
        },
      });

      set({ loading: false });
      set({ error: "" });
    } catch (error) {
      // Ambil data dari localStorage jika API gagal atau status offline
      const backupData = localStorage.getItem(
        `dataTorenAir-${getIdBangunan()}`
      );
      // Jika ada data backup, gunakan data tersebut
      if (backupData) {
        const parsedData = JSON.parse(backupData);
        set({
          waterData: {
            namaGedung: parsedData.nama_gedung || "",
            KapasitasToren: parsedData.kapasitasToren || [],
            AirKeluar: parsedData.AirKeluar || "",
            AirMasuk: parsedData.AirMasuk || "",
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
      console.log("debug setelah backupData");
      console.error(`ini error air`, error);
    }
  },
}));
