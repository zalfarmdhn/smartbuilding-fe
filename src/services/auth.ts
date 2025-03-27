/* eslint-disable @typescript-eslint/no-explicit-any */
// import { LoginApiResponse } from "../types/auth";
import init from "./";

export const login = async (email: string, password:  string): Promise<any> => {
  try {
    const response = await init.post("/auth/login", {
      "email": email,
      "password": password
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default { login };