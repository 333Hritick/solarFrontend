import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NotificationDropdown from "./NotificationDropdown";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Benefits", href: "/#benefits" },
    { name: "Subsidies", href: "/#subsidies" },
    { name: "Calculator", href: "/#calculator" },
    { name: "Process", href: "/#process" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-[9999] h-20 bg-sky-700 border-b border-sky-900 shadow-lg"
    >
      <div className="flex items-center justify-between px-4 md:px-8 h-full">
        {/* LOGO */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/img1.png"
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 transition-transform hover:scale-105"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative font-medium text-white transition-colors duration-200 
                         after:absolute after:block after:h-[2px] after:bg-sky-400 after:w-0 
                         hover:after:w-full after:bottom-0 after:left-0 after:transition-all after:duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE: Notifications + Auth */}
        <div className="hidden md:flex items-center gap-6">
          {/* Notification Bell */}
          <NotificationDropdown />

          {/* Auth Buttons */}
          <Link
            to="/login"
            className="px-5 py-2 border border-white text-white rounded-full transition-colors duration-200 hover:scale-105 hover:bg-white hover:text-sky-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-full bg-white text-sky-700 transition-colors duration-200 hover:scale-105 hover:bg-sky-600 hover:text-white"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden flex items-center transition-transform hover:scale-110"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <Menu className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transform transition-all duration-300 ${
          isMobileMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        } bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg border-t`}
      >
        <div className="px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-2 font-medium text-gray-800 dark:text-gray-200 hover:text-sky-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <hr />
          <Link
            to="/login"
            className="block py-2 text-center border border-sky-600 rounded-full text-sky-600 hover:bg-sky-600 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block py-2 text-center rounded-full bg-sky-600 text-white hover:bg-sky-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
