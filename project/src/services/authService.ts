import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Login and save tokens
export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/token/`, { email, password });
  console.log("API_URL:", import.meta.env.VITE_API_URL);

  localStorage.setItem("accessToken", res.data.access);
  localStorage.setItem("refreshToken", res.data.refresh);
  return res.data;
};

// ✅ Get tokens
export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

// ✅ Refresh access token
export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  const res = await axios.post(`${API_URL}/token/refresh/`, { refresh });
  localStorage.setItem("accessToken", res.data.access);
  return res.data.access;
};

// ✅ Logout
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};
