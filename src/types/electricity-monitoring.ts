interface IBiayaPemakaian {
  Nama: string;
  Biaya: string;
}

interface IDayaListrik {
  nama: string;
  Value: string;
}

export type THari =
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu"
  | "Minggu";

  
export type TMinggu =
  | "Minggu 1"
  | "Minggu 2"
  | "Minggu 3"
  | "Minggu 4"
  | "Minggu 5";

export type TBulan =
  | "Januari"
  | "Februari"
  | "Maret"
  | "April"
  | "Mei"
  | "Juni"
  | "Juli"
  | "Agustus"
  | "September"
  | "Oktober"
  | "November"
  | "Desember";

export interface IElectricData {
  nama_gedung: string;
  TotalWatt: string;
  TotalDayaListrik: IDayaListrik[];
  BiayaPemakaian: IBiayaPemakaian[];
  CreatedAt: string;
  UpdatedAt: string;
}

export interface IElectricChart {
  nama_gedung: string;
  TotalWatt: string;
  TotalDayaListrik: IDayaListrik[];
  BiayaPemakaian: IBiayaPemakaian[];
  DataPenggunaanListrikHarian: {
    [key in THari]?: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikHarian: {
    [key in THari]?: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikMingguan: {
    [key in TMinggu]?: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikMingguan: {
    [key in TMinggu]?: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikBulanan: {
    [key in TBulan]?: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikBulanan: {
    [key in TBulan]?: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikTahunan: {
    [key: string]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikTahunan: {
    [key: string]: Array<{ Nama: string; Biaya: string }>;
  };
  CreatedAt: string;
  UpdatedAt: string;
}
