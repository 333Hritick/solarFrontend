import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Home, Briefcase } from "lucide-react";
import { registerUser } from "../api";   // ✅ use centralized API


const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    accounttype: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.accounttype.trim()) newErrors.accounttype = "Account type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  try {
    await registerUser(form);   // ✅ use centralized API
    alert("Registered successfully!");
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      accounttype: "",
    });
    navigate("/login");
  } catch (err: any) {
    if (err.response && err.response.data) {
      setErrors(err.response.data);
    } else {
      alert("Registration failed!");
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
          Create Your Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <User className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <Mail className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <Phone className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <Lock className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <Home className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Account Type */}
        <div className="mb-6">
          <div className="flex items-center bg-gray-100 rounded-lg px-3">
            <Briefcase className="w-5 h-5 text-sky-600 mr-2" />
            <input
              type="text"
              name="accounttype"
              placeholder="Account Type"
              value={form.accounttype}
              onChange={handleChange}
              className="w-full p-2 bg-transparent outline-none"
            />
          </div>
          {errors.accounttype && <p className="text-red-500 text-sm mt-1">{errors.accounttype}</p>}
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
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-sky-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
