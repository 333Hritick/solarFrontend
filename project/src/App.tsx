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
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import { useEffect } from "react";

function App() {

  // ✅ ADD THIS
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0); // scroll to top when route changes
    }
  }, [pathname, hash]);
  // ✅ END ADD

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
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

        <Route path="/emi-calculator" element={<EMICalculator />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
