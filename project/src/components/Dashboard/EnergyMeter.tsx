import React from "react";

interface EnergyMeterProps {
  title: string;
  value: number;
  unit: string;
  color: "yellow" | "blue" | "green" | "purple";
  icon: React.ComponentType<{ className?: string }>; // accepts any Lucide icon
}

const EnergyMeter: React.FC<EnergyMeterProps> = ({
  title,
  value,
  unit,
  color,
  icon: Icon,
}) => {
  const colorClasses = {
    yellow: "from-yellow-400 to-orange-500",
    blue: "from-blue-500 to-purple-600",
    green: "from-green-500 to-teal-600",
    purple: "from-purple-500 to-pink-600",
  };

  const maxValue = 50; // configurable max
  const percentage = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Icon className="w-6 h-6 text-gray-600" />
      </div>

      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className={`h-4 bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">
            {value.toFixed(1)}
          </span>
          <span className="text-gray-500">{unit}</span>
        </div>

        <p className="text-sm text-gray-500 mt-2">Real-time IoT meter reading</p>
      </div>
    </div>
  );
};

export default EnergyMeter;
