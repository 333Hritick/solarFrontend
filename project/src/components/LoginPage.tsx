import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../api";   // centralized API

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email (e.g. user@example.com)";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(form.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await loginUser(form);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        alert("Login failed!");
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-900 via-sky-700 to-sky-500">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Login to Your Account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <Mail className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email (e.g. user@example.com)"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <Lock className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Strong password (min 8 chars, A-Z, a-z, 0-9, @#$%)"
              value={form.password}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-700 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register link */}
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
