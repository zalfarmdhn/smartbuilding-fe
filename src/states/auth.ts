import { create } from "zustand";
import { setToken } from "../utils/tokenHandler";
import authAPI from "../services/auth";
import { setDataSetting, setIdBangunan } from "../utils/backupData";
import { IErrorAPI } from "../types/error";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface AuthState {
  token: string | null;
  loading: boolean;
  idBangunanResponse: number | null;
  errorAuth: IErrorAPI | null;
  login: (email: string, password: string) => void;
}

export const useAuth = create<AuthState>()((set) => ({
  token: null,
  idBangunanResponse: null,
  loading: false,
  errorAuth: null,
  login: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const response = await authAPI.login(email, password);
      const token: string = response.data.token;
      const settingBangunan = response.data.Setting;
      if (token) {
        setToken(response.data.token);
      }
      setIdBangunan(String(settingBangunan[0].id));
      setDataSetting(JSON.stringify(settingBangunan));
      toast.success("Berhasil login, redirect ke halaman dashboard...");
      set({ loading: false });
      window.location.href = "/";
      return response.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.message || "Terjadi kesalahan saat login");
        console.error(e);
        set({ errorAuth: e.response?.data as IErrorAPI, loading: false });
      }
    }
  },
}));
