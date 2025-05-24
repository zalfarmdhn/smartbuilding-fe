import { create } from "zustand";
import pengelolaAPI from "../services/pengelola";
import { IPengelolaGedung, IPengelolaBody } from "../types/pengelola";

interface IPengelolaState {
  pengelolaList: IPengelolaGedung[] | null;
  loading: boolean;
  error: string | null;
  getPengelolaGedung: () => Promise<void>;
  createPengelolaGedung: (pengelola_gedung: IPengelolaBody) => Promise<void>;
  updatePengelolaGedung: (id: number, pengelola_gedung: IPengelolaBody) => Promise<void>;
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
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
  
  // Create a new pengelola gedung
  createPengelolaGedung: async (pengelola_gedung) => {
    try {
      set({ loading: true, error: null });
      const response = await pengelolaAPI.postPengelolaGedung(pengelola_gedung);
      if (response) {
        // Refresh the list after creating
        await get().getPengelolaGedung();
      }
    } catch (error) {
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
    // Delete pengelola gedung
  deletePengelolaGedung: async (id) => {
    try {
      set({ loading: true, error: null });
      await pengelolaAPI.deletePengelolaGedung(id);
      // Refresh the list after deletion
      await get().getPengelolaGedung();
    } catch (error) {
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
  
  // Update pengelola gedung
  updatePengelolaGedung: async (id, pengelola_gedung) => {
    try {
      set({ loading: true, error: null });
      const response = await pengelolaAPI.putPengelolaGedung(id, pengelola_gedung);
      if (response) {
        // Refresh the list after updating
        await get().getPengelolaGedung();
      }
    } catch (error) {
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
}));
