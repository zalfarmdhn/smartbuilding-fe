export interface WaterMonitoringStateRoot {
  KapasitasToren: string
  AirKeluar: string
  AirMasuk: string
  VolumeSensor: string
  DataPenggunaanHarian: DataPenggunaanHarian
  DataPenggunaanMingguan: DataPenggunaanMingguan
  DataPenggunaanTahunan: DataPenggunaanTahunan
  CreatedAt: string
  UpdatedAt: string
}

export interface DataPenggunaanHarian {
  [key: string]: Array<{
    pipa: string
    volume: string
  }>
}

export interface DataPenggunaanMingguan {
  [key: string]: Array<{
    pipa: string
    volume: string
  }>
}

export interface DataPenggunaanTahunan {
  [key: string]: Array<{
    pipa: string
    volume: string
  }>
}
