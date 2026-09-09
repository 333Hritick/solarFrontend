import React from "react";
import { LogOut } from "lucide-react";
import { logout } from "../../services/authService";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: "Dashboard" | "Trading" | "Transactions" | "Profile") => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md">
      <div className="flex space-x-6">
        {["Dashboard", "Trading", "Transactions", "Profile"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`hover:text-yellow-400 ${
              activeTab === tab ? "text-yellow-400 font-bold" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Logout button */}
      <button
        onClick={logout}
        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
