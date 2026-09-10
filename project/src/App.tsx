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
import { useDevice } from "./components/context/DeviceContext";
   // ✅ import context

// ProtectedRoute wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getAccessToken();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const { pathname, hash } = useLocation();
  const { hasDevice, setHasDevice, loading, setLoading ,setProfile} = useDevice();   // ✅ consume context

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

  // ✅ Check if user has a registered device
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setHasDevice(false);
      setLoading(false);
      return;
    }

    const checkDevice = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setHasDevice(data.devices && data.devices.length > 0);
    setProfile(data);
  } catch (err) {
    console.error("Error checking device:", err);
    setHasDevice(false);
  } finally {
    setLoading(false);
  }
};


    checkDevice();
  }, [setHasDevice, setLoading]);

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public routes WITH Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Benefits />
              <Subsidies />
              <Calculator />
              <Process />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/emi-calculator"
          element={
            <>
              <Header />
              <EMICalculator />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <RegisterPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <LoginPage />
            </>
          }
        />

        {/* Dashboard route with device check */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {loading ? (
                <div>Loading...</div>
              ) : hasDevice ? (
                <Dashboard />
              ) : (
                <Navigate to="/register-device" />
              )}
            </ProtectedRoute>
          }
        />

        {/* Register Device route */}
        <Route
          path="/register-device"
          element={
            <ProtectedRoute>
              <RegisterDevice />
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
