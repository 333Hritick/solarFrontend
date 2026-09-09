import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-lg bg-white/80 shadow-md dark:bg-gray-900/80"
          : "bg-gradient-to-b from-sky-800/90 via-sky-700/70 to-transparent dark:from-gray-900/90 dark:via-gray-800/70"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:h-20">
        {/* LOGO */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/img1.png"
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-20 transition-transform hover:scale-105"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative font-medium transition-colors duration-200 ${
                isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"
              } after:absolute after:block after:h-[2px] after:bg-sky-500 after:w-0 hover:after:w-full after:bottom-0 after:left-0`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className={`px-5 py-2 border rounded-full transition-colors duration-200 ${
              isScrolled
                ? "border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
                : "border-white text-white hover:bg-white hover:text-sky-600"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-5 py-2 rounded-full transition-colors duration-200 ${
              isScrolled
                ? "bg-sky-600 text-white hover:bg-sky-700"
                : "bg-white text-sky-700 hover:bg-sky-600 hover:text-white"
            }`}
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
            <X className={`w-7 h-7 ${isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"}`} />
          ) : (
            <Menu className={`w-7 h-7 ${isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
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
    </header>
  );
};

export default Header;
