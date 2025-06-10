import init from ".";
import { IResponse, IResponseData } from "../types/response";
import { IUserPengelola, IUserWithID } from "../types/users";

export const getUsers = async (): Promise<IResponseData<IUserWithID[]>> => {
  const response = await init.get("/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getUserById = async (
  id: number
): Promise<IResponseData<IUserWithID>> => {
  const response = await init.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const createUser = async ({
  username,
  email,
  password,
  role,
  pengelola_gedung,
}: IUserPengelola): Promise<IResponseData<IUserPengelola> | undefined> => {
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
): Promise<IResponseData<IUserWithID> | undefined> => {
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

export const deleteUser = async (id: number): Promise<IResponse> => {
  const response = await init.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<IResponse> => {
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
