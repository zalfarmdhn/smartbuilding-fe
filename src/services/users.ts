import toast from "react-hot-toast";
import init from ".";
import { IUserResponse, IUsersResponse } from "../types/users";

export const getUsers = async (): Promise<IUsersResponse | undefined> => {
  try {
    const response = await init.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id: number): Promise<IUserResponse | undefined> => {
  try {
    const response = await init.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  role: string,
  pengelola_gedung: Array<{
    setting_id: number;
  }>
): Promise<IUserResponse | undefined> => {
  try {
    const response = await init.post(
      "/users",
      {
        username,
        email,
        password,
        role,
        pengelola_gedung,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("User berhasil dibuat!");
    return response.data;
  } catch (error) {
    toast.error("Gagal membuat user. Silakan coba lagi.");
    console.error(error);
  }
};

export const updateUser = async (
  id: number,
  username: string,
  email: string,
  password: string,
  role: string
): Promise<IUserResponse | undefined> => {
  try {
    const response = await init.put(
      `/users/${id}`,
      {
        username,
        email,
        password,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("User berhasil diperbarui!");
    return response.data;
  } catch (error) {
    toast.error("Gagal memperbarui user. Silakan coba lagi.");
    console.error(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await init.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("User berhasil dihapus!");
    return response.data;
  } catch (error) {
    toast.error("Gagal menghapus user. Silakan coba lagi.");
    console.error(error);
  }
};

export default {
  getUsers,
  getUserById,
  createUser, 
  updateUser,
  deleteUser,
};