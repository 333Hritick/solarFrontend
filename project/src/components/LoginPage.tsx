import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", form);
      localStorage.setItem("user", JSON.stringify(res.data)); // store user info
      // Redirect to dashboard
      window.location.href = "http://localhost:5174/"; // dashboard app URL
    } catch {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 mb-2 rounded bg-gray-700" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" />
        <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
