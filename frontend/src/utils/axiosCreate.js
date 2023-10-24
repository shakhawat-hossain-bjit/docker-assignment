import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

const axiosInstanceToken = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

axiosInstanceToken.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance, axiosInstanceToken };
