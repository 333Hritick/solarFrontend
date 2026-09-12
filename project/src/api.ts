import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

export const api = axios.create({
  baseURL: API_URL,
});

// Auth
export const registerUser = (data: any) => api.post("/register/", data);
export const loginUser = (data: any) =>
  api.post("/token/", { username: data.email, password: data.password });
export const getProfile = (token: string) =>
  api.get("/profile/", { headers: { Authorization: `Bearer ${token}` } });

// Quotes & EMI
// src/api.ts
export const createQuote = (data: any, config: object = {}) =>
  api.post("/quote/", data, config);

export const calculateEmi = (data: any) => api.post("/calculate_emi/", data);

// Orders & trading
export const createOrder = (data: any) => api.post("/createorder/", data);
export const getOffers = () => api.get("/offers/");
export const executeTrade = (orderId: number) => api.post(`/buy/${orderId}/`);

// Devices & production
export const registerDevice = (data: any, token: string) =>
  api.post("/device/register/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const postProduction = (data: any) => api.post("/production/", data);
export const getMyData = () => api.get("/mydata/");
export const getEnergyPredict = () => api.get("/energypredict/");

// Notifications
export const getNotifications = () => api.get("/notifications/");

// src/api.ts
export const getDaphneCalculations = () =>
  api.get("/daphne/calculations/");
