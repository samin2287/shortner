import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.accessToken = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (fullName, email, password) => {
    const res = await api.post("/auth/signup", { fullName, email, password });
    return res.data;
  },
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },
  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get("/auth/profile");
    return res.data;
  },
};

export const URLService = {
  createShort: async (originalURL) => {
    const res = await api.post("/url/create", { originalURL });
    return res.data;
  },
  getAll: async () => {
    const res = await api.get("/url/getall");
    return res.data;
  },
};

export default api;