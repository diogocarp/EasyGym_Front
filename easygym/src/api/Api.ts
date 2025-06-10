import axios, { AxiosInstance } from "axios";
import User from "../models/User";

const api = axios.create({
  baseURL: "https://api.exemplo.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export function postUser(api: AxiosInstance, user: User) {
  try {
      api.post("localhost:8080/users", user).then()
  } catch (e) {
      console.log(e)
  }
}


export default api;
