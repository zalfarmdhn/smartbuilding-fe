interface IPengelolaGedung {
  setting_id: number;
}

export interface IUser {
  username: string;
  email: string;
  role: string;
  password: string | undefined;
}

export interface IUserWithID extends IUser {
  id: number;
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
