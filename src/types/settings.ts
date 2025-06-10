type TMonitoringStatus = [
  { "monitoring air": "unknown" | "offline" | "online" },
  { "monitoring listrik": "unknown" | "offline" | "online" }
];

type TDataToren = {
  monitoring_name: string;
  kapasitas_toren: number;
};

type TDataTorenResponse = TDataToren & {
  id: number;
  id_setting: number;
};

export interface ISettings {
  id?: number;
  nama_gedung: string;
  harga_listrik: number;
  jenis_listrik: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
  monitoring_status?: TMonitoringStatus;
}

export interface IAddSettings extends ISettings {
  data_toren: TDataToren[];
}

export interface IAddTorenSuccess extends IAddSettings {
  data_toren: TDataTorenResponse[];
}
