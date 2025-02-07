/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMonitoringAir } from "../services/water-monitoring";

const db = window.localStorage;

export const setToken = (token: string) => {
  db.setItem("token", token);
};

export const getToken = () => {
  return db.getItem("token");
};

export const removeToken = () => {
  db.removeItem("token");
};

export const hasToken = () => {
  return getToken() !== null;
};

export const checkToken = async () => {
  try {
    const response = await getMonitoringAir();
    if(response) return true;
  } catch (error: any) {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    console.error(error);
    return error;
  }
}