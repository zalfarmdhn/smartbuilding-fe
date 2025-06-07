interface IWaterData {
  namaGedung: string;
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

export interface WaterMonitoringState {
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
  error: string;
  loading: boolean;
  isMonitoringOnline: () => boolean;
  getWaterData: () => Promise<void>;
}
