export interface LoginApiResponse {
  data: AuthLogin;
  message: string;
  status: string;
}

interface AuthLogin {
  token: string;
  role: string;
}