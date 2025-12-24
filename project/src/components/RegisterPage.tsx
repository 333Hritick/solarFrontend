import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "",phone:"",  password: "" ,address:"", accounttype:""});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register/", form);
      alert("Registered successfully!");
       setForm({
      name: "",
      email: "",
      phone:"",
      password: "",
      address: "",
      accounttype: "",
    });

      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 mb-2 rounded bg-gray-700" />
        <input type="email" name="email" placeholder="Email"  value={form.email} onChange={handleChange} className="w-full p-2 mb-2 rounded bg-gray-700" />
        <input type="phone" name="phone" placeholder="phone" value={form.phone}  onChange={handleChange} className="w-full p-2 mb-2 rounded bg-gray-700" />
         <input type="password" name="password" placeholder="Password" value={form.password}  onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" />
         <input type="text" name="address" placeholder="address" value={form.address}  onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" />
          <input type="text" name="accounttype" placeholder="AccountType" value={form.accounttype}  onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" />
        <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
