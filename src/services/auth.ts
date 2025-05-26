import { ILoginApiResponse } from "../types/auth";
import init from "./";

export const login = async (
  email: string,
  password: string
): Promise<ILoginApiResponse> => {
  const response = await init.post("/auth/login", {
    email: email,
    password: password,
  });
  return response.data;
};

export default { login };
