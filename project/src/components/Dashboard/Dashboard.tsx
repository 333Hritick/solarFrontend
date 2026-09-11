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
import { getProfile, getEnergyPredict } from "../../api";

interface Notification {
  id: string;
  title: string;
  content: string;
  source: string;
  published_at: string;
}

const DashboardHeader: React.FC<{ notifications: Notification[] }> = ({ notifications }) => (
  <header className="flex justify-between items-center px-4 py-3 bg-white shadow-md sticky top-0 z-50">
    <h1 className="text-lg md:text-xl font-bold text-gray-800">Dashboard</h1>
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

  const [forecast, setForecast] = useState<{ temp: number; humidity: number; clouds: number; sunlight: number } | null>(null);
  const [predictedProduction, setPredictedProduction] = useState<number>(0);

  const WS_URL = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/ws/notifications/`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [
        { id: Date.now().toString(), ...data },
        ...prev,
      ]);
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    const checkDevice = async () => {
      try {
        const res = await getProfile(userToken);
        const data = res.data;
        if (!data.devices || data.devices.length === 0) {
          setCurrentTab("RegisterDevice");
        }
      } catch (err) {
        console.error("Device check error:", err);
      }
    };
    if (userToken) checkDevice();
  }, [userToken]);

  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const res = await getEnergyPredict();
        const data = res.data;

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader notifications={notifications} />
      <Navbar activeTab={currentTab} setActiveTab={setCurrentTab} />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {currentTab === "Dashboard" && (
          <>
            {/* Welcome */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Welcome back, {userType === "producer" ? "Energy Producer" : "Energy Consumer"}!
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Monitor your energy {userType === "producer" ? "production and sales" : "consumption and purchases"} in real-time
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {/* Production */}
              <MetricCard
                title="Energy Production"
                value={`${energyData.production.toFixed(1)} kWh`}
                icon={<Sun className="w-6 h-6 md:w-8 md:h-8 text-yellow-200" />}
                gradient="from-yellow-400 to-orange-500"
                footer="+5.2% from yesterday"
              />

              {/* Consumption */}
              <MetricCard
                title="Energy Consumption"
                value={`${energyData.consumption.toFixed(1)} kWh`}
                icon={<Zap className="w-6 h-6 md:w-8 md:h-8 text-blue-200" />}
                gradient="from-blue-500 to-purple-600"
                footer="-2.1% from yesterday"
              />

              {/* Surplus */}
              <MetricCard
                title="Surplus Energy"
                value={`${energyData.surplus.toFixed(1)} kWh`}
                icon={<Battery className="w-6 h-6 md:w-8 md:h-8 text-green-200" />}
                gradient="from-green-500 to-teal-600"
                footer="Available for trading"
              />

              {/* Forecast */}
              <MetricCard
                title="Tomorrow’s Forecast"
                value={forecast ? `${forecast.temp}°C | Clouds: ${forecast.clouds}% | Sunlight: ${forecast.sunlight}%` : "Loading..."}
                gradient="from-indigo-400 to-blue-600"
              />

              {/* Predicted Production */}
              <MetricCard
                title="Predicted Production"
                value={`${predictedProduction} kWh`}
                gradient="from-pink-500 to-red-600"
              />

              {/* Efficiency */}
              <MetricCard
                title="Efficiency"
                value={`${efficiency.toFixed(1)}%`}
                icon={<TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-purple-200" />}
                gradient="from-purple-500 to-pink-600"
                footer="Verified by blockchain"
              />
            </div>

            {/* Real-time Meters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <EnergyMeter title="Solar Panel Output" value={energyData.production} unit="kWh" color="yellow" icon={Sun} />
              <EnergyMeter title="Home Consumption" value={energyData.consumption} unit="kWh" color="blue" icon={Zap} />
            </div>
          </>
        )}

        {currentTab === "Trading" && <TradingPanel energyData={energyData} userType={userType} />}
        {currentTab === "Transactions" && <RecentTransactions />}
        {currentTab === "Profile" && <Profile />}
        {currentTab === "RegisterDevice" && <RegisterDevice />}
      </main>
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: string; gradient: string; icon?: React.ReactNode; footer?: string }> = ({ title, value, gradient, icon, footer }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-lg p-4 md:p-6 text-white flex flex-col justify-between`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm md:text-base opacity-80">{title}</p>
        <p className="text-lg md:text-2xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
    {footer && <p className="text-xs md:text-sm mt-2 opacity-90">{footer}</p>}
  </div>
);

export default Dashboard;
