import React, { useState } from "react";
import { Leaf, DollarSign, Home, Zap, Award, Users, X } from "lucide-react";
import { motion } from "framer-motion";

const Benefits = () => {
  const [popupImage, setPopupImage] = useState<string | null>(null);

  const benefits = [
    { icon: <DollarSign className="w-12 h-12 text-green-500" />, title: "Massive Savings", description: "Save 70-90% on electricity bills with solar power. Average savings of ₹50,000+ per year for typical homes." },
    { icon: <Leaf className="w-12 h-12 text-green-500" />, title: "Eco-Friendly", description: "Reduce your carbon footprint by 4-5 tons of CO2 annually. Help create a cleaner environment for future generations." },
    { icon: <Home className="w-12 h-12 text-sky-500" />, title: "Increase Home Value", description: "Solar installations increase property value by 15-20%. Make your home more attractive to future buyers." },
    { icon: <Zap className="w-12 h-12 text-yellow-500" />, title: "Energy Independence", description: "Generate your own power and reduce dependence on grid electricity. Store excess energy with battery backup options." },
    { icon: <Award className="w-12 h-12 text-purple-500" />, title: "Government Support", description: "Get up to 40% subsidy. Bills below show real proof of government benefits.", highlighted: true, image: "/images/bill.jpg" },
    { icon: <Users className="w-12 h-12 text-blue-500" />, title: "Expert Installation", description: "Professional installation by certified technicians. Comprehensive maintenance and monitoring support included." },
  ];

  return (
    <section id="benefits" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">Why Choose Solar Energy?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solar power isn't just good for the environment—it’s great for your wallet too.
          </p>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-2xl p-8 shadow-lg transition-all duration-300 group flex flex-col justify-between min-h-[280px] ${
                benefit.highlighted ? "bg-yellow-100 border-4 border-yellow-500 scale-105" : "bg-white border border-gray-100"
              }`}
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>

              {benefit.image && (
                <img
                  src={benefit.image}
                  alt="Bill proof"
                  className="mt-4 rounded-lg shadow-md w-32 h-32 object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setPopupImage(benefit.image)}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-gradient-to-r from-sky-500 via-indigo-600 to-emerald-500 animate-gradient-x rounded-2xl p-12 text-center shadow-xl">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Start Saving?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of homeowners switching to clean energy.</p>
          <button className="bg-white text-sky-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-700 hover:text-white transition-all shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Popup Image */}
      {popupImage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-3xl">
            <button className="absolute -top-10 right-0 text-white text-3xl" onClick={() => setPopupImage(null)}>
              <X />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={popupImage}
              className="rounded-lg shadow-xl max-h-[85vh]"
              alt="Full bill"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Benefits;
