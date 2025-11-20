import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Benefits", href: "#benefits" },
    { name: "Subsidies", href: "#subsidies" },
    { name: "Calculator", href: "#calculator" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-lg bg-white/70 shadow-lg"
          : "bg-gradient-to-b from-sky-800/90 via-sky-700/70 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:h-20">
        {/* Logo pinned to top-left */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="images/img1.png"
            alt="Logo"
            className="h-16 sm:h-20 lg:h-24 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`relative font-medium transition-colors duration-200 ${
                isScrolled ? "text-gray-800" : "text-white"
              } after:absolute after:block after:h-[2px] after:bg-sky-500 after:w-0 after:transition-all hover:after:w-full after:bottom-0 after:left-0`}
            >
              {item.name}
            </a>
          ))}
          <Link
            to="/emi-calculator"
            className={`font-medium transition-colors duration-200 ${
              isScrolled ? "text-sky-600 hover:text-sky-800" : "text-white hover:text-sky-300"
            }`}
          >
            EMI Calculator
          </Link>
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className={`px-5 py-2 border rounded-full transition ${
              isScrolled
                ? "border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
                : "border-white text-white hover:bg-white hover:text-sky-600"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-5 py-2 rounded-full transition ${
              isScrolled
                ? "bg-sky-600 text-white hover:bg-sky-700"
                : "bg-white text-sky-700 hover:bg-sky-600 hover:text-white"
            }`}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`w-7 h-7 ${isScrolled ? "text-gray-800" : "text-white"}`} />
          ) : (
            <Menu className={`w-7 h-7 ${isScrolled ? "text-gray-800" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-t animate-fade-in">
          <div className="px-6 py-4 space-y-3 text-gray-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 font-medium hover:text-sky-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <hr className="my-2" />

            <Link
              to="/login"
              className="block py-2 text-center border border-sky-600 rounded-full text-sky-600 hover:bg-sky-600 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block py-2 text-center rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
