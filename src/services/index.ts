import axios from "axios"

const API_URL = "http://127.0.0.1:3000/api"

const init = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

export default init;