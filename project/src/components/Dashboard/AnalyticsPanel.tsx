import React from "react";
import { BarChart3, TrendingUp, Calendar, Download } from "lucide-react";

interface AnalyticsProps {
  energyData: {
    production: number;
    consumption: number;
    surplus: number;
    credits: number;
  };
}

const Analytics: React.FC<AnalyticsProps> = ({ energyData }) => {
  const weeklyData = [
    { day: "Mon", production: 42, consumption: 38, surplus: 4 },
    { day: "Tue", production: 45, consumption: 35, surplus: 10 },
    { day: "Wed", production: 48, consumption: 40, surplus: 8 },
    { day: "Thu", production: 44, consumption: 36, surplus: 8 },
    { day: "Fri", production: 46, consumption: 42, surplus: 4 },
    { day: "Sat", production: 50, consumption: 45, surplus: 5 },
    {
      day: "Sun",
      production: energyData.production,
      consumption: energyData.consumption,
      surplus: energyData.surplus,
    },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 245 },
    { month: "Feb", revenue: 312 },
    { month: "Mar", revenue: 398 },
    { month: "Apr", revenue: 456 },
    { month: "May", revenue: 523 },
    { month: "Jun", revenue: 601 },
  ];

  // 🔹 Dynamic calculations
  const avgProduction =
    weeklyData.reduce((sum, d) => sum + d.production, 0) / weeklyData.length;
  const totalSurplus = weeklyData.reduce((sum, d) => sum + d.surplus, 0);
  const latestRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;
  const efficiency =
    energyData.production > 0
      ? ((energyData.production - energyData.consumption) /
          energyData.production) *
        100
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Energy Analytics</h2>
        <p className="text-gray-600">
          Comprehensive insights into your energy production, consumption, and trading performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Weekly Average</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {avgProduction.toFixed(1)} kWh
          </p>
          <p className="text-sm text-gray-500 mt-2">Production per day</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Surplus</h3>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalSurplus} kWh</p>
          <p className="text-sm text-gray-500 mt-2">This week</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">${latestRevenue}</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Efficiency</h3>
            <Calendar className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">
            {efficiency.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-2">System efficiency</p>
        </div>
      </div>

      {/* Weekly & Monthly Charts */}
      {/* (unchanged from your version, still maps weeklyData & monthlyRevenue) */}

      {/* Performance Insights */}
      {/* (unchanged, but you could also calculate dynamically if you want) */}
    </div>
  );
};

export default Analytics;
