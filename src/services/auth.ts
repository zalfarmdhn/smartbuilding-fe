import { AuthLogin as IAuthLogin } from "../types/auth";
import { IResponse, IResponseData } from "../types/response";
import init from "./";

const login = async (
  email: string,
  password: string
): Promise<IResponseData<IAuthLogin>> => {
  const response = await init.post("/auth/login", {
    email: email,
    password: password,
  });
  return response.data;
};

const logout = async (): Promise<IResponse> => {
  const response = await init.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export default { login, logout };
