import { create } from "zustand";
import { setToken } from "../utils/tokenHandler";
import authAPI from "../services/auth";
import { setDataSetting, setIdBangunan } from "../utils/backupData";
import { IErrorAPI } from "../types/error";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthState {
  token: string | null;
  loading: boolean;
  idBangunanResponse: number | null;
  errorAuth: null | IErrorAPI;
  login: (email: string, password: string) => void;
}

export const useAuthState = create<AuthState>()((set) => ({
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
      // window.location.replace("/");
      set({ loading: false });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "Terjadi kesalahan saat login"
        );
        set({ errorAuth: error.response?.data?.message, loading: false });
        // return agar tidak melanjutkan eksekusi
        return;
      }
      // Jika bukan AxiosError, set pesan error default
      set({
        errorAuth: { message: "Terjadi kesalahan saat login" } as IErrorAPI,
        loading: false,
      });
    }
  },
}));
