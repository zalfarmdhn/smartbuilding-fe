export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string | undefined;
  pengelola_gedung: Array<{
    setting_id: number;
  }>;
}

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
  role: string;
  pengelola_gedung: Array<{
    setting_id: number;
  }>;
}

export interface IUserResponse {
  data: IUser;
  message: string;
  status: string;
}

export interface IUsersResponse {
  data: IUser[];
  message: string;
  status: string;
}
