export interface IMeRoot {
  data: IMeData;
  message: string;
  status: string;
}

export interface IMeData {
  id: number;
  username: string;
  email: string;
  role: string;
}