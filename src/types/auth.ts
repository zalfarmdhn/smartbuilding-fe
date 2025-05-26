export interface ILoginApiResponse {
  data: AuthLogin;
  message: string;
  status: string;
}

interface AuthLogin {
  token: string;
  role: string;
  user_id: number;
  Setting: Array<{
    id: number;
    nama_gedung: string;
    haos_url: string;
    haos_token: string;
    scheduler: number;
    harga_listrik: number;
    jenis_listrik: string;
  }>;
}
