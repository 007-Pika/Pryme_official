import axios from "axios";
import { getToken } from "./authHelper";

const axiosInstance = axios.create({
  baseURL: "https://pryme-backend-2khs.onrender.com/api",
});

// Attach JWT to all requests automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
