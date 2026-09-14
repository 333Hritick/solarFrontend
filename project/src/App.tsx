// src/App.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Subsidies from "./components/Subsidies";
import Calculator from "./components/Calculator";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EMICalculator from "./components/EMICalculator";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import RegisterDevice from "./components/RegisterDevice";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken } from "./services/authService";
import { Toaster } from "react-hot-toast";

// ProtectedRoute wrapper → only checks token
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getAccessToken();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const { pathname, hash } = useLocation();

  // ✅ Smooth scroll on route change
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen">
      {/* ✅ Toast notifications will now render */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public routes WITH Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="min-h-screen bg-gradient-to-br from-sky-900 via-sky-700 to-sky-500 pt-20 md:pt-2">
                <Hero />
                <Benefits />
                <Subsidies />
                <Calculator />
                <Process />
                <Testimonials />
                <Contact />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/emi-calculator"
          element={
            <>
              <Header />
              <div className="min-h-screen bg-white md:pt-20">
                <EMICalculator />
              </div>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <div className="min-h-screen bg-white md:pt-20">
                <RegisterPage />
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <div className="min-h-screen bg-white md:pt-20">
                <LoginPage />
              </div>
            </>
          }
        />

        {/* Dashboard route → only protected by token */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <div className="min-h-screen bg-white md:pt-20">
                  <Dashboard />
                </div>
              </>
            </ProtectedRoute>
          }
        />

        {/* Register Device route → only protected by token */}
        <Route
          path="/register-device"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <div className="min-h-screen bg-white md:pt-20">
                  <RegisterDevice />
                </div>
              </>
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
