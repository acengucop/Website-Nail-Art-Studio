import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json"
  }
});

// Tambahkan token Bearer ke setiap request jika tersedia
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")?.trim();
    if (token) {
      config.headers = config.headers || {};
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
