import init from ".";
import { IUserResponse, IUsersResponse } from "../types/users";

export const getUsers = async (): Promise<IUsersResponse | undefined> => {
  const response = await init.get("/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getUserById = async (
  id: number
): Promise<IUserResponse | undefined> => {
  const response = await init.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
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
  return response.data;
};

export const updateUser = async (
  id: number,
  username: string,
  email: string,
  password: string,
  role: string
): Promise<IUserResponse | undefined> => {
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
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await init.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const response = await init.put(
    "/change-password",
    {
      old_Password: oldPassword,
      new_Password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};
