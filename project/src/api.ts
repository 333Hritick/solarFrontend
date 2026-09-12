import axios from "axios";
import { getAccessToken, refreshAccessToken } from "./services/authService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
});

// ✅ Request interceptor: attach token automatically
api.interceptors.request.use(async (config) => {
  let token = getAccessToken();

  // If no token, try refreshing
  if (!token) {
    token = await refreshAccessToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Response interceptor: auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // retry request with new token
      }
    }

    return Promise.reject(error);
  }
);

// --- API endpoints ---
export const registerUser = (data: any) => api.post("device/register/", data);
export const loginUser = (data: any) => api.post("/token/", data);
export const getProfile = () => api.get("/profile/");
export const createQuote = (data: any, config: object = {}) =>
  api.post("/quote/", data, config);
export const calculateEmi = (data: any) => api.post("/calculate_emi/", data);
export const createOrder = (data: any) => api.post("/createorder/", data);
export const getOffers = () => api.get("/offers/");
export const executeTrade = (orderId: number) => api.post(`/buy/${orderId}/`);
export const registerDevice = (data: any) => api.post("/device/register/", data);
export const postProduction = (data: any) => api.post("/production/", data);
export const getMyData = () => api.get("/mydata/");
export const getEnergyPredict = () => api.get("/energypredict/");
export const getNotifications = () => api.get("/notifications/");
export const getDaphneCalculations = () => api.get("/daphne/calculations/");
