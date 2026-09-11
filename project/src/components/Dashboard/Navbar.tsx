import React from "react";
import { LogOut } from "lucide-react";
import { logout } from "../../services/authService";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: "Dashboard" | "Trading" | "Transactions" | "Profile") => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="w-full bg-gray-800 text-white px-4 md:px-6 py-3 shadow-md flex justify-between items-center">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 md:gap-6">
        {["Dashboard", "Trading", "Transactions", "Profile"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`transition-colors hover:text-yellow-400 ${
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
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-semibold transition"
      >
        <LogOut className="w-4 h-4 md:w-5 md:h-5" />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
