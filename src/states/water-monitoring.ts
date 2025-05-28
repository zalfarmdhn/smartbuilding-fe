import { create } from "zustand";
import waterMonitoring from "../services/water-monitoring";
import { getIdBangunan, setDataMonitoring } from "../utils/backupData";
import axios from "axios";
import { WaterMonitoringState } from "../types/water-monitoring";

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
  getWaterData: async () => {
    try {
      const idBangunan = parseInt(getIdBangunan() || "1");
      const response = await waterMonitoring.getMonitoringAir(idBangunan);
      const dataTorenAirBackup = JSON.parse(
        localStorage.getItem("dataTorenAir") || "{}"
      );
      if (
        response.AirKeluar === dataTorenAirBackup.AirKeluar &&
        response.AirMasuk === dataTorenAirBackup.AirMasuk
      ) {
        console.log("Data monitor air gagal disimpan");
        throw new Error(
          "Data monitoring air tidak berubah, menggunakan data dari backup."
        );
      }
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
            response.DataPenggunaanBulanan || response.DataPenggunaanTahunan, // Gunakan DataPenggunaanTahunan jika DataPenggunaanBulanan tidak tersedia
          DataPenggunaanTahunan: response.DataPenggunaanTahunan,
        },
      });
      console.log("Data monitoring air tersimpan");
      setDataMonitoring(JSON.stringify(response));
      set({ loading: false });
      set({ error: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        // Ambil data dari localStorage jika API gagal
        const backupData = localStorage.getItem("dataTorenAir");
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
            loading: false,
            error: "Menggunakan data tersimpan - Koneksi API gagal",
          });
          // Kalau tidak ada data backup, set error
        } else {
          set({ error: `${error}`, loading: false });
        }
        // throw new Error(error.response?.data.error);
      }
      // Jika bukan AxiosError, set error umum
      console.error(`ini error air`, error);
      set({ error: `${error}`, loading: false });
    }
  },
}));
