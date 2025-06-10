export interface ISetting {
  id: number;
  nama_gedung: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
  harga_listrik: number;
  jenis_listrik: string;
}

export interface AuthLogin {
  token: string;
  role: string;
  user_id: number;
  Setting: ISetting[];
}
