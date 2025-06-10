interface IPengelolaGedung {
  setting_id: number;
}

export interface IUser {
  id?: number;
  username: string;
  email: string;
  role: string;
  password: string | undefined;
}

export interface IUserPengelola extends IUser {
  pengelola_gedung: IPengelolaGedung[];
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
