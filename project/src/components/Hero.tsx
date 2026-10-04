import {
  ArrowRight,
  BatteryCharging,
  Home,
  Shield,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const SolarFlow = () => (
  <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/60 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-md sm:p-8">
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-white">Your solar system</p>
        <p className="mt-1 text-xs text-slate-300">Clean energy in motion</p>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        LIVE
      </div>
    </div>

    <svg
      viewBox="0 0 600 330"
      className="w-full overflow-visible"
      role="img"
      aria-label="Animated solar energy flow from sunlight to panels, inverter, and home"
    >
      <defs>
        <linearGradient id="solar-energy-gradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="55%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <filter id="solar-energy-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Energy route behind the equipment */}
      <path
        d="M105 90 C155 90 175 120 225 135"
        fill="none"
        stroke="url(#solar-energy-gradient)"
        strokeWidth="3"
        strokeDasharray="8 8"
        opacity=".65"
      />
      <path
        d="M280 155 C310 180 310 205 310 228"
        fill="none"
        stroke="url(#solar-energy-gradient)"
        strokeWidth="3"
        strokeDasharray="8 8"
        opacity=".65"
      />
      <path
        d="M355 250 C400 250 435 220 475 185"
        fill="none"
        stroke="url(#solar-energy-gradient)"
        strokeWidth="3"
        strokeDasharray="8 8"
        opacity=".65"
      />

      {/* Animated energy particles */}
      <circle r="6" fill="#fff7ad" filter="url(#solar-energy-glow)">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath href="#sun-to-panel" />
        </animateMotion>
      </circle>
      <circle r="5" fill="#bef264" filter="url(#solar-energy-glow)">
        <animateMotion dur="2s" begin="-1s" repeatCount="indefinite">
          <mpath href="#sun-to-panel" />
        </animateMotion>
      </circle>
      <circle r="6" fill="#d9f99d" filter="url(#solar-energy-glow)">
        <animateMotion dur="1.6s" repeatCount="indefinite">
          <mpath href="#panel-to-inverter" />
        </animateMotion>
      </circle>
      <circle r="5" fill="#6ee7b7" filter="url(#solar-energy-glow)">
        <animateMotion dur="1.6s" begin="-.8s" repeatCount="indefinite">
          <mpath href="#panel-to-inverter" />
        </animateMotion>
      </circle>
      <circle r="6" fill="#6ee7b7" filter="url(#solar-energy-glow)">
        <animateMotion dur="1.8s" repeatCount="indefinite">
          <mpath href="#inverter-to-home" />
        </animateMotion>
      </circle>
      <circle r="5" fill="#a7f3d0" filter="url(#solar-energy-glow)">
        <animateMotion dur="1.8s" begin="-.9s" repeatCount="indefinite">
          <mpath href="#inverter-to-home" />
        </animateMotion>
      </circle>

      {/* Invisible paths used by the moving particles */}
      <path id="sun-to-panel" d="M105 90 C155 90 175 120 225 135" fill="none" />
      <path id="panel-to-inverter" d="M280 155 C310 180 310 205 310 228" fill="none" />
      <path id="inverter-to-home" d="M355 250 C400 250 435 220 475 185" fill="none" />

      {/* Sun */}
      <g>
        <circle cx="75" cy="75" r="26" fill="#facc15" opacity=".2" />
        <circle cx="75" cy="75" r="17" fill="#facc15" />
        <foreignObject x="61" y="61" width="28" height="28">
          <Sun className="h-7 w-7 text-amber-950" />
        </foreignObject>
        <text x="75" y="120" textAnchor="middle" fill="#e2e8f0" fontSize="12">
          SUNLIGHT
        </text>
      </g>

      {/* Solar panels */}
      <g>
        <rect x="205" y="105" width="100" height="65" rx="8" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="2" />
        <path d="M238 106v63 M272 106v63 M206 127h98 M206 149h98" stroke="#7dd3fc" strokeWidth="1.5" opacity=".8" />
        <text x="255" y="194" textAnchor="middle" fill="#e2e8f0" fontSize="12">
          SOLAR PANELS
        </text>
      </g>

      {/* Inverter */}
      <g>
        <rect x="270" y="225" width="82" height="58" rx="10" fill="#1e293b" stroke="#a3e635" strokeWidth="2" />
        <foreignObject x="296" y="235" width="30" height="30">
          <BatteryCharging className="h-7 w-7 text-lime-300" />
        </foreignObject>
        <text x="311" y="302" textAnchor="middle" fill="#e2e8f0" fontSize="12">
          INVERTER
        </text>
      </g>

      {/* Home */}
      <g>
        <circle cx="500" cy="155" r="38" fill="#34d399" opacity=".14" />
        <foreignObject x="477" y="132" width="46" height="46">
          <Home className="h-11 w-11 text-emerald-300" />
        </foreignObject>
        <text x="500" y="212" textAnchor="middle" fill="#e2e8f0" fontSize="12">
          YOUR HOME
        </text>
      </g>
    </svg>

    <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-300">
      <span>Sunlight → panels → inverter → home</span>
      <span className="font-semibold text-emerald-300">Clean power</span>
    </div>
  </div>
);

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
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
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-cover bg-center pt-28 md:pt-32"
      style={{ backgroundImage: "url('/images/panel.jpg')" }}
    >
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-white/70" />

      <div className="container relative z-10 mx-auto px-6 py-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left text section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-sky-900 md:text-6xl">
              PM Surya Ghar:
              <span className="block bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Muft Bijli Yojana
              </span>
            </h1>

            <div className="mb-6 rounded-lg border-l-4 border-sky-600 bg-sky-50 p-4 shadow-sm">
              <p className="italic text-gray-700">
                "In order to further sustainable development and people's well-being,
                we are launching the PM Surya Ghar: Muft Bijli Yojana..."
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Shri Narendra Modi
                <br />
                <span className="text-sm text-gray-600">
                  Hon’ble Prime Minister of India
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollTo("calculator")}
                className="group flex items-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Calculate Savings
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollTo("contact")}
                className="rounded-full border-2 border-sky-600 px-8 py-4 text-lg font-semibold text-sky-700 shadow-lg transition-all duration-300 hover:bg-sky-600 hover:text-white"
              >
                Get Free Consultation
              </motion.button>
            </div>
          </motion.div>

          {/* Animated solar flow replaces the PM Modi image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <SolarFlow />
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map(({ Icon, title, text, color }) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.04 }}
              className="rounded-2xl border border-sky-100 bg-white/80 p-8 text-center shadow-xl backdrop-blur-lg transition-transform duration-300"
            >
              <Icon className={`mx-auto mb-4 h-14 w-14 ${color}`} />
              <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-gray-700">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;