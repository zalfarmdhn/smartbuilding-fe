export interface IWaterData {
  KapasitasToren: IKapasitasToren[];
  AirKeluar: string;
  AirMasuk: string;
  UpdatedAt: string;
}

export interface IKapasitasToren {
  nama: string;
  kapasitas: string;
  kapasitas_toren: string;
  volume_sensor: string;
  created_at: string;
}
