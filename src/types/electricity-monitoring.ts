interface IBiayaPemakaian {
  Nama: string;
  Biaya: string;
}

interface IDayaListrik {
  nama: string;
  Value: string;
}

type THari =
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu"
  | "Minggu";

type TMinggu =
  | "Minggu ke-1"
  | "Minggu ke-2"
  | "Minggu ke-3"
  | "Minggu ke-4"
  | "Minggu ke-5";

type TBulan =
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

interface IBiayaPemakaian {
  Nama: string;
  Biaya: string;
}

interface IDayaListrik {
  nama: string;
  Value: string;
}

interface IElectricData {
  namaGedung: string;
  TotalWatt: string;
  TotalDayaListrik: IDayaListrik[];
  BiayaPemakaian: IBiayaPemakaian[];
  UpdatedAt: string;
}

interface IElectricChart {
  DataPenggunaanListrikHarian: {
    [key in THari]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikHarian: {
    [key in THari]: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikMingguan: {
    [key in TMinggu]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikMingguan: {
    [key in TMinggu]: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikBulanan: {
    [key in TBulan]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikBulanan: {
    [key in TBulan]: Array<{ Nama: string; Biaya: string }>;
  };
  DataPenggunaanListrikTahunan: {
    [key: string]: Array<{ nama: string; Value: string }>;
  };
  DataBiayaListrikTahunan: {
    [key: string]: Array<{ Nama: string; Biaya: string }>;
  };
}
export interface ElectricMonitorState {
  electricData: IElectricData;
  electricChart: IElectricChart;
  error: string;
  loading: boolean;
  getElectricData: () => void;
}
