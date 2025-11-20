import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* PM Surya Ghar Section */}
      <div className="container mx-auto px-6 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Text Section */}
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-sky-900 leading-tight mb-6">
              PM Surya Ghar:
              <span className="block text-blue-600">Muft Bijli Yojana</span>
            </h1>

            <p className="text-lg text-gray-700 mb-6">
              "In order to further sustainable development and people's well-being,
              we are launching the PM Surya Ghar: Muft Bijli Yojana. This project,
              with an investment of over Rs. 75,000 crores, aims to light up 1 crore
              households by providing up to 300 units of free electricity every month."
            </p>

            <p className="font-semibold text-gray-800 text-xl">
              Shri Narendra Modi <br />
              <span className="text-gray-600 text-base">Hon’ble Prime Minister of India</span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 mt-10">
              <button
                onClick={() =>
                  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group bg-sky-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-sky-700 transition-all duration-300 flex items-center"
              >
                Calculate Savings
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-sky-600 text-sky-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-600 hover:text-white shadow-lg transition-all duration-300"
              >
                Get Free Consultation
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center">
            <img
              src="images/modi.png" 
              alt="PM Modi"
              className="w-full max-w-md object-contain drop-shadow-xl"
            />
          </div>

        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              Icon: Zap,
              title: "Clean Energy",
              text: "100% renewable solar power for your home",
              color: "text-yellow-500",
            },
            {
              Icon: TrendingUp,
              title: "Save Money",
              text: "Reduce electricity bills by up to 90%",
              color: "text-green-600",
            },
            {
              Icon: Shield,
              title: "25 Year Warranty",
              text: "Guaranteed performance and peace of mind",
              color: "text-blue-600",
            },
          ].map(({ Icon, title, text, color }) => (
            <div
              key={title}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl hover:scale-[1.04] transition-transform duration-300"
            >
              <Icon className={`w-14 h-14 mx-auto mb-4 ${color}`} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
