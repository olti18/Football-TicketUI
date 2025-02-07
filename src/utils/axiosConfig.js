import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/football-ticket";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// Add response interceptor for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
