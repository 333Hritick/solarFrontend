import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getAccessToken } from "../services/authService";
import { Mail, Lock } from "lucide-react";
import { useDevice } from "./context/DeviceContext";
import { getProfile } from "../api";   // centralized API

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setHasDevice, setLoading } = useDevice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ Call SimpleJWT /token/ via authService
      await login(form.email, form.password);

      const token = getAccessToken();
      if (!token) {
        alert("You must be logged in.");
        navigate("/login");
        return;
      }

      // ✅ Fetch profile with Bearer token
      const res = await getProfile(token);

      setLoading(false);
      if (res.data.devices && res.data.devices.length > 0) {
        setHasDevice(true);
        navigate("/dashboard", { replace: true });
      } else {
        setHasDevice(false);
        navigate("/register-device", { replace: true });
      }
    } catch (err) {
      alert("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-sky-900 via-sky-700 to-sky-500">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to access your dashboard
        </p>

        <div className="flex items-center bg-gray-100 rounded-lg mb-4 px-3">
          <Mail className="w-5 h-5 text-sky-600 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 bg-transparent outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg mb-6 px-3">
          <Lock className="w-5 h-5 text-sky-600 mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 bg-transparent outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-sky-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
