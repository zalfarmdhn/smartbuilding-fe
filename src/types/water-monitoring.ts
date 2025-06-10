type TWaterPipe = {
  pipa: string;
  volume: string;
};

interface IKapasitasToren {
  nama: string;
  kapasitas: string;
  kapasitas_toren: string;
  volume_sensor: string;
  created_at: string;
}

export interface IWaterData {
  nama_gedung: string;
  kapasitasToren: IKapasitasToren[];
  AirKeluar: string;
  AirMasuk: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface IWaterChart {
  DataPenggunaanHarian: Record<string, TWaterPipe[]>;
  DataPenggunaanMingguan: Record<string, TWaterPipe[]>;
  DataPenggunaanBulanan: Record<string, TWaterPipe[]>;
  DataPenggunaanTahunan: Record<string, TWaterPipe[]>;
}

export interface IWaterResponse extends IWaterData, IWaterChart {}

export interface WaterMonitoringState {
  waterData: IWaterData;
  waterChart: IWaterChart;
  error: string;
  loading: boolean;
  isMonitoringOnline: () => boolean;
  getWaterData: () => Promise<void>;
}
