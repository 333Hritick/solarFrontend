import { ArrowRight, Zap, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden 
                 bg-cover bg-center pt-28 md:pt-32"
      style={{ backgroundImage: "url('/images/panel.jpg')" }} // <-- solar background
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="container mx-auto px-6 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-sky-900 leading-tight mb-6">
              PM Surya Ghar:
              <span className="block bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Muft Bijli Yojana
              </span>
            </h1>

            <div className="bg-sky-50 border-l-4 border-sky-600 p-4 rounded-lg shadow-sm mb-6">
              <p className="text-gray-700 italic">
                "In order to further sustainable development and people's well-being,
                we are launching the PM Surya Ghar: Muft Bijli Yojana..."
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Shri Narendra Modi <br />
                <span className="text-gray-600 text-sm">Hon’ble Prime Minister of India</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                Calculate Savings
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-sky-600 text-sky-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-600 hover:text-white shadow-lg transition-all duration-300"
              >
                Get Free Consultation
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image Section - PM Modi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src="/images/modi.png"
              alt="PM Modi"
              className="w-full max-w-md object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { Icon: Zap, title: "Clean Energy", text: "100% renewable solar power for your home", color: "text-yellow-500" },
            { Icon: TrendingUp, title: "Save Money", text: "Reduce electricity bills by up to 90%", color: "text-green-600" },
            { Icon: Shield, title: "25 Year Warranty", text: "Guaranteed performance and peace of mind", color: "text-blue-600" },
          ].map(({ Icon, title, text, color }) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.04 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl transition-transform duration-300 border border-sky-100"
            >
              <Icon className={`w-14 h-14 mx-auto mb-4 ${color}`} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
