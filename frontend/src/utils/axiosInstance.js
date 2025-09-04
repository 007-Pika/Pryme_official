import axios from "axios";
import { getToken } from "./authHelper";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9700/api", 
  withCredentials: true,// adjust to your backend URL
});

// Add the Authorization header if token exists
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
