import { create } from "zustand";
import userAPI from "../services/users";
import { IUser } from "../types/users";
import toast from "react-hot-toast";
import axios from "axios";

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
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
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
      if (axios.isAxiosError(error)) {
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },

  // Create a new user
  createUser: async (username, email, password, role, pengelola_gedung) => {
    try {
      set({ loading: true, error: null });
      await userAPI.createUser({
        username,
        email,
        password,
        role,
        pengelola_gedung,
      });
      toast.success("User berhasil dibuat!");
      // Refresh the users list
      await get().getUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`);
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },

  // Update an existing user
  updateUser: async (id, username, email, password, role) => {
    try {
      set({ loading: true, error: null });
      await userAPI.updateUser(id, username, email, password, role);
      toast.success("User berhasil diperbarui!");
      // Refresh the users list
      await get().getUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`);
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      await userAPI.deleteUser(id);
      toast.success("User berhasil dihapus!");
      // Refresh the users list
      await get().getUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`);
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },

  // Change Password
  changePassword: async (oldPassword: string, newPassword: string) => {
    try {
      set({ loading: true, error: null });
      await userAPI.changePassword(oldPassword, newPassword);
      toast.success("Password berhasil diubah!");
      set({ loading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`);
        console.error(error);
      }
      set({ error: `${error}`, loading: false });
    }
  },
}));
