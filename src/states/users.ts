import { create } from "zustand";
import userAPI from "../services/users";
import { IUser } from "../types/users";

interface IUserState {
  users: IUser[] | null;
  loading: boolean;
  error: string | null;
  getUsers: () => Promise<void>;
  createUser: (
    username: string,
    email: string,
    password: string,
    role: string,
    pengelola_gedung: { setting_id: number }[]
  ) => Promise<void>;
  updateUser: (
    id: number,
    username: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUsers = create<IUserState>((set, get) => ({
  users: null,
  loading: false,
  error: null,
  
  // Get all users
  getUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await userAPI.getUsers();
      if (response) {
        set({
          users: response.data,
          loading: false,
        });
      }
    } catch (error) {
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
  
  // Create a new user
  createUser: async (username, email, password, role, pengelola_gedung) => {
    try {
      set({ loading: true, error: null });
      await userAPI.createUser(username, email, password, role, pengelola_gedung);
      // Refresh the users list
      await get().getUsers();
    } catch (error) {
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
  
  // Update an existing user
  updateUser: async (id, username, email, password, role) => {
    try {
      set({ loading: true, error: null });
      await userAPI.updateUser(id, username, email, password, role);
      // Refresh the users list
      await get().getUsers();
    } catch (error) {
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
  
  // Delete a user
  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      await userAPI.deleteUser(id);
      // Refresh the users list
      await get().getUsers();
    } catch (error) {
      console.error(error);
      set({ error: `${error}`, loading: false });
    }
  },
}));