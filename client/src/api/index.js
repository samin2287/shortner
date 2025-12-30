import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});
// ---------- REQUEST INTERCEPTOR START ----------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// ---------- REQUEST INTERCEPTOR END ----------
const authService = {
  register: async (fullName, email, password) => {
    const res = await api.post("/auth/registration", {
      fullName,
      email,
      password,
    });
    return res.data;
  },
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get("/auth/getprofile");
    return res.data;
  },
};

const URLService = {
  createShort: async (originalURL) => {
    const res = await api.post("/url/create", { originalURL });
    return res.data;
  },
  getAll: async () => {
    const res = await api.get("/url/getall");
    return res.data;
  },
};
export { api, authService, URLService };
