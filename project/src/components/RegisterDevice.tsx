import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../services/authService";
import { useDevice } from "./context/DeviceContext";
import { registerDevice, getProfile } from "../api";   // ✅ use centralized API

const RegisterDevice: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    serial_number: "",
    location: "",
    capacity_kw: "",
    installation_date: "",
    manufacturer: "",
    description: ""
  });

  const navigate = useNavigate();
  const { setHasDevice, setLoading } = useDevice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getAccessToken();
      if (!token) {
        alert("You must be logged in to register a device.");
        navigate("/login");
        return;
      }

      // ✅ Call API helper
      await registerDevice(
        {
          ...form,
          capacity_kw: form.capacity_kw ? parseFloat(form.capacity_kw) : null,
          installation_date: form.installation_date || null,
        },
        token
      );

      const res = await getProfile(token);

      setLoading(false);
      if (res.data.devices && res.data.devices.length > 0) {
        setHasDevice(true);
        navigate("/dashboard", { replace: true });
      } else {
        setHasDevice(false);
        alert("Device not detected, please try again.");
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        alert(`Error: ${err.response.data.error}`);
      } else {
        alert("Error registering device");
      }
      console.error("Register device error:", err);
    }
  };



  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register Your Device</h2>

        <input type="text" name="name" placeholder="Device Name" value={form.name} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <input type="text" name="serial_number" placeholder="Serial Number" value={form.serial_number} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <input type="text" name="capacity_kw" placeholder="Capacity (kW)" value={form.capacity_kw} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <input type="date" name="installation_date" value={form.installation_date} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <input type="text" name="manufacturer" placeholder="Manufacturer" value={form.manufacturer} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register Device</button>
      </form>
    </div>
  );
};

export default RegisterDevice;
