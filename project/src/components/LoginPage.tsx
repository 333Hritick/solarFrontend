import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", form);

      console.log("RESPONSE:", res.data);

      // Save tokens to localStorage 
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      console.log("Tokens saved:", res.data.access);

      alert("Login successful!");

      //  Passing token through URL
      const token = res.data.access; 
      window.location.href = `http://localhost:5174/dashboard?token=${token}`;

    } catch (err) {
      alert("Invalid login credentials");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
