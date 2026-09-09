// src/components/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from "react";
import {
  Battery, Sun, Zap, TrendingUp, ArrowUpRight, ArrowDownRight, Shield
} from "lucide-react";
import EnergyMeter from "./EnergyMeter";
import RecentTransactions from "./RecentTransactions";
import TradingPanel from "./TradingPanel";
import Navbar from "./Navbar";
import Profile from "./Profile";
import NotificationDropdown from "./NotificationDropdown";
import RegisterDevice from "../RegisterDevice";
import { getAccessToken } from "../../services/authService";

interface Notification {
  id: string;
  title: string;
  content: string;
  source: string;
  published_at: string;
}

const DashboardHeader: React.FC<{ notifications: Notification[] }> = ({ notifications }) => (
  <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
    <h1 className="text-xl font-bold">Dashboard</h1>
    <NotificationDropdown notifications={notifications} />
  </header>
);

interface EnergyData {
  production: number;
  consumption: number;
  surplus: number;
  credits: number;
}

const Dashboard: React.FC = () => {
  const [energyData, setEnergyData] = useState<EnergyData>({
    production: 0,
    consumption: 0,
    surplus: 0,
    credits: 0,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userType] = useState("producer");

  const [currentTab, setCurrentTab] = useState<
    "Dashboard" | "Trading" | "Transactions" | "Profile" | "RegisterDevice"
  >("Dashboard");

  const userToken = getAccessToken() || "";

  // ✅ WebSocket notifications
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9080/ws/notifications/");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [
        { id: Date.now().toString(), ...data },
        ...prev,
      ]);
    };
    return () => ws.close();
  }, []);

  // ✅ Check if device exists → if not, redirect to RegisterDevice
  useEffect(() => {
    const checkDevice = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user_profile/", {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        const data = await res.json();
        if (!data.devices || data.devices.length === 0) {
          setCurrentTab("RegisterDevice");
        }
      } catch (err) {
        console.error("Device check error:", err);
      }
    };
    if (userToken) checkDevice();
  }, [userToken]);

  // ✅ Energy + Forecast fetch
  const [forecast, setForecast] = useState<{ temp: number; humidity: number; clouds: number; sunlight: number } | null>(null);
  const [predictedProduction, setPredictedProduction] = useState<number>(0);

  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/energypredict/");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        setEnergyData({
          production: data.today_production,
          consumption: Math.round(data.today_production * 0.7),
          surplus: data.today_production - Math.round(data.today_production * 0.7),
          credits: Math.round(data.predicted_next_day * 10),
        });

        setForecast(data.weather);
        setPredictedProduction(data.predicted_next_day);
      } catch (err) {
        console.error("Energy fetch error:", err);
      }
    };

    fetchEnergy();
    const interval = setInterval(fetchEnergy, 5000);
    return () => clearInterval(interval);
  }, []);

  const efficiency =
    energyData.production > 0
      ? ((energyData.production - energyData.consumption) / energyData.production) * 100
      : 0;

  return (
    <div className="space-y-6">
      <DashboardHeader notifications={notifications} />
      <Navbar activeTab={currentTab} setActiveTab={setCurrentTab} />

      {/* Tabs */}
      {currentTab === "Dashboard" && (
        <>
          {/* Welcome */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back, {userType === "producer" ? "Energy Producer" : "Energy Consumer"}!
            </h2>
            <p className="text-gray-600">
              Monitor your energy {userType === "producer" ? "production and sales" : "consumption and purchases"} in real-time
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Production */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Energy Production</p>
                  <p className="text-2xl font-bold">{energyData.production.toFixed(1)} kWh</p>
                </div>
                <Sun className="w-8 h-8 text-yellow-200" />
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm">+5.2% from yesterday</span>
              </div>
            </div>

            {/* Consumption */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Energy Consumption</p>
                  <p className="text-2xl font-bold">{energyData.consumption.toFixed(1)} kWh</p>
                </div>
                <Zap className="w-8 h-8 text-blue-200" />
              </div>
              <div className="flex items-center mt-4">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span className="text-sm">-2.1% from yesterday</span>
              </div>
            </div>

            {/* Surplus */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Surplus Energy</p>
                  <p className="text-2xl font-bold">{energyData.surplus.toFixed(1)} kWh</p>
                </div>
                <Battery className="w-8 h-8 text-green-200" />
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm">Available for trading</span>
              </div>
            </div>

            {/* Forecast */}
            <div className="bg-gradient-to-br from-indigo-400 to-blue-600 rounded-xl p-6 text-white">
              <div>
                <p className="text-indigo-100 text-sm">Tomorrow’s Forecast</p>
                {forecast ? (
                  <>
                    <p className="text-lg">Temp: {forecast.temp}°C</p>
                    <p className="text-lg">Clouds: {forecast.clouds}%</p>
                    <p className="text-lg">Sunlight: {forecast.sunlight}%</p>
                  </>
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>
            </div>

            {/* Predicted Production */}
            <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-xl p-6 text-white">
              <div>
                <p className="text-pink-100 text-sm">Predicted Production</p>
                <p className="text-2xl font-bold">{predictedProduction} kWh</p>
              </div>
            </div>

            {/* Efficiency */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Efficiency</p>
                  <p className="text-2xl font-bold">{efficiency.toFixed(1)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
                            <div className="flex items-center mt-4">
                <Shield className="w-4 h-4 mr-1" />
                <span className="text-sm">Verified by blockchain</span>
              </div>
            </div>
          </div>

          {/* Real-time Meters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnergyMeter
              title="Solar Panel Output"
              value={energyData.production}
              unit="kWh"
              color="yellow"
              icon={Sun}
            />
            <EnergyMeter
              title="Home Consumption"
              value={energyData.consumption}
              unit="kWh"
              color="blue"
              icon={Zap}
            />
          </div>
        </>
      )}

      {currentTab === "Trading" && (
        <TradingPanel energyData={energyData} userType={userType} />
      )}

      {currentTab === "Transactions" && <RecentTransactions />}

      {currentTab === "Profile" && <Profile />}

      {/* ✅ Register Device tab */}
      {currentTab === "RegisterDevice" && <RegisterDevice />}
    </div>
  );
};

export default Dashboard;
