import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL
// const DEV_API_URL = import.meta.env.VITE_DEV_API_URL

const init = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default init;