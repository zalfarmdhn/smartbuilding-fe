import { create } from "zustand";
import { setToken } from "../utils/tokenHandler"
import authAPI from "../services/auth";
import { setDataRole, setDataSetting, setIdBangunan } from "../utils/backupData";

interface AuthState {
  token: string | null;
  loading: boolean;
  role: string;
  idBangunanResponse: number | null;
  error: string | null;
  login: (email: string, password: string) => void;
}

export const useAuth = create<AuthState>()((set) => ({
  token: null,
  role: "",
  idBangunanResponse: null,
  loading: false,
  error: null,
  login: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const response = await authAPI.login(email, password);
      if (response.status === 401) {
        throw new Error(response.response.data.error);
      }
      const token: string = response.data.token;
      const settingBangunan = response.data.Setting;
      if(token) {
        setToken(response.data.token);
      }
      setIdBangunan(String(settingBangunan[0].id));
      setDataSetting(JSON.stringify(settingBangunan));
      setDataRole(response.data.role);
      set({ loading: false });
      window.location.href = "/";
      return response.data;
    } catch (e) {
      set({ error: `${e}`});
      console.error(e);
      set({ loading: false });
    }
  }
}));