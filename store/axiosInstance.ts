import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADDRESS, // Set global base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically attach token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("loggedIn");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(
      error.response?.data ?? { success: false, message: "An error occurred", errors: [] }
    );
  }
);

export default api;
