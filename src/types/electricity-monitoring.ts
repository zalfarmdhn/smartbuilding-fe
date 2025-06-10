type TPenggunaanListrik = {
  nama: string;
  Value: string;
};

type TBiayaListrik = {
  Nama: string;
  Biaya: string;
};

interface IBiayaPemakaian {
  Nama: string;
  Biaya: string;
}

interface IDayaListrik {
  nama: string;
  Value: string;
}

interface IBiayaPemakaian {
  Nama: string;
  Biaya: string;
}

interface IDayaListrik {
  nama: string;
  Value: string;
}

interface IElectricData {
  nama_gedung: string;
  TotalWatt: string;
  TotalDayaListrik: IDayaListrik[];
  BiayaPemakaian: IBiayaPemakaian[];
  CreatedAt: string;
  UpdatedAt: string;
}

interface IElectricChart {
  DataPenggunaanListrikHarian: {
    [key: string]: TPenggunaanListrik[];
  };
  DataBiayaListrikHarian: {
    [key: string]: TBiayaListrik[];
  };
  DataPenggunaanListrikMingguan: {
    [key: string]: TPenggunaanListrik[];
  };
  DataBiayaListrikMingguan: {
    [key: string]: TBiayaListrik[];
  };
  DataPenggunaanListrikBulanan: {
    [key: string]: TPenggunaanListrik[];
  };
  DataBiayaListrikBulanan: {
    [key: string]: TBiayaListrik[];
  };
  DataPenggunaanListrikTahunan: {
    [key: string]: TPenggunaanListrik[];
  };
  DataBiayaListrikTahunan: {
    [key: string]: TBiayaListrik[];
  };
}

export interface IElectricResponse extends IElectricData, IElectricChart {}

export interface ElectricMonitorState {
  electricData: IElectricData;
  electricChart: IElectricChart;
  error: string;
  loading: boolean;
  isMonitoringOnline: () => boolean;
  getElectricData: () => void;
}
