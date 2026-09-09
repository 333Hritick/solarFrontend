// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:8000/api";

// ✅ Login and save tokens
export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login/`, { email, password });
  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);
  return res.data; // contains access + refresh
};

// ✅ Get tokens
export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

// ✅ Refresh access token
export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  const res = await axios.post(`${API_URL}/token/refresh/`, { refresh });
  localStorage.setItem("access_token", res.data.access);
  return res.data.access;
};

// ✅ Logout
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
