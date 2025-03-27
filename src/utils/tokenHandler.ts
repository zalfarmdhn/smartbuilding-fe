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