type MonitoringStatus = [
  { "monitoring air": "unknown" | "offline" | "online" },
  { "monitoring listrik": "unknown" | "offline" | "online" }
];

export interface ISettings {
  id: number;
  nama_gedung: string;
  harga_listrik: number;
  jenis_listrik: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
  monitoring_status: MonitoringStatus;
}

export interface IAddSettings {
  nama_gedung: string;
  harga_listrik: number;
  jenis_listrik: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
  data_toren: {
    monitoring_name: string;
    kapasitas_toren: number;
  }[];
}
