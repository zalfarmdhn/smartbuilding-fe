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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DataPenggunaanHarian {}

export interface DataPenggunaanMingguan {
  [key: `Minggu ${number}`]: Array<{
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
