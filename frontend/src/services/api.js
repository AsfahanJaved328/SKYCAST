import axios from "axios";

const defaultApiUrl =
  import.meta.env.PROD
    ? "https://skycast-api-asfahan.vercel.app/api/v1"
    : "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || "Request failed.";
    return Promise.reject(new Error(message));
  },
);

export default api;
