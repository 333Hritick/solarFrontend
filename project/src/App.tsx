import React from "react";
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
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
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
      </Routes>
     <Toaster position="top-center" reverseOrder={false} />

    </div>
  );
}

export default App;
