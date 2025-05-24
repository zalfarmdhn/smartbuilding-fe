export interface IPengelolaGedung {
  id: number;
  nama_gedung: string;
  username: string;
  email: string;
  role: string;
  setting_id: number;
}

export interface IPengelolaBody {
  id_user: number;
  id_setting: number;
}

export interface IPengelolaGedungResponse extends IPengelolaBody {
  id: number;
}