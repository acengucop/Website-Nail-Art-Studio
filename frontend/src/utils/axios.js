import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",  // ← no trailing slash
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")?.trim();
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default instance;
