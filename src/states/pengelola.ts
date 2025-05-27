import { create } from "zustand";
import pengelolaAPI from "../services/pengelola";
import { IPengelolaGedung, IPengelolaBody } from "../types/pengelola";
import toast from "react-hot-toast";
import axios from "axios";

interface IPengelolaState {
  pengelolaList: IPengelolaGedung[] | null;
  loading: boolean;
  error: string | null;
  getPengelolaGedung: () => Promise<void>;
  createPengelolaGedung: (pengelola_gedung: IPengelolaBody) => Promise<void>;
  updatePengelolaGedung: (
    id: number,
    pengelola_gedung: IPengelolaBody
  ) => Promise<void>;
  deletePengelolaGedung: (id: number) => Promise<void>;
}

export const usePengelola = create<IPengelolaState>((set, get) => ({
  pengelolaList: null,
  loading: false,
  error: null,

  // Get all pengelola gedung
  getPengelolaGedung: async () => {
    try {
      set({ loading: true, error: null });
      const response = await pengelolaAPI.getPengelolaGedung();
      if (response) {
        set({
          pengelolaList: response,
          loading: false,
        });
      }
    } catch (error) {
      console.error(`error mengambil pengelola gedung`, error);
      set({ error: `${error}`, loading: false });
    }
  },

  // Create a new pengelola gedung
  createPengelolaGedung: async (pengelola_gedung) => {
    try {
      set({ loading: true, error: null });
      const response = await pengelolaAPI.postPengelolaGedung(pengelola_gedung);
      if (response) {
        toast.success("Pengelola gedung berhasil dibuat!");
        // Refresh the list after creating
        await get().getPengelolaGedung();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },
  // Delete pengelola gedung
  deletePengelolaGedung: async (id) => {
    try {
      set({ loading: true, error: null });
      await pengelolaAPI.deletePengelolaGedung(id);
      // Refresh the list after deletion
      toast.success("Pengelola gedung berhasil dihapus!");
      await get().getPengelolaGedung();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },

  // Update pengelola gedung
  updatePengelolaGedung: async (id, pengelola_gedung) => {
    try {
      set({ loading: true, error: null });
      const response = await pengelolaAPI.putPengelolaGedung(
        id,
        pengelola_gedung
      );
      if (response) {
        toast.success("Pengelola gedung berhasil diperbarui!");
        // Refresh the list after updating
        await get().getPengelolaGedung();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },
}));
