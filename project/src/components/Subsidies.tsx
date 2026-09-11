import { useState } from "react";
import { CheckCircle, IndianRupee, Building, Home as HomeIcon, Sun, Leaf, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Subsidies = () => {
  const subsidyPrograms = [
    {
      title: "Central Government Subsidy (MNRE)",
      amount: "₹14,588 per kW",
      maxAmount: "Up to ₹78,000",
      capacity: "For systems up to 3kW",
      description: "Direct subsidy on solar panel installation for residential rooftop systems",
      eligibility: ["Individual house owners", "Group housing societies", "Residential welfare associations"],
      icon: <Sun className="w-12 h-12 text-yellow-400" />,
    },
    {
      title: "State Government Incentives",
      amount: "₹10,000–20,000 per kW",
      maxAmount: "Up to ₹50,000",
      capacity: "Varies by state",
      description: "Additional state-specific subsidies and incentives for solar adoption",
      eligibility: ["Varies by state policy", "Residential consumers", "Agricultural users"],
      icon: <Leaf className="w-12 h-12 text-green-500" />,
    },
    {
      title: "Net Metering Benefits",
      amount: "100% credit for excess power",
      maxAmount: "No limit",
      capacity: "All system sizes",
      description: "Sell excess solar power back to the grid at retail electricity rates",
      eligibility: ["All solar installations", "Grid-connected systems", "Approved by electricity board"],
      icon: <Zap className="w-12 h-12 text-sky-500" />,
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="subsidies" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Government Subsidies & Incentives
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Indian government is committed to promoting solar energy adoption. Take advantage of these
            generous subsidies and tax benefits to make solar installation more affordable.
          </p>
        </motion.div>

        {/* Subsidy Programs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {subsidyPrograms.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-transform duration-300 p-8 text-center flex flex-col justify-between min-h-[320px]"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md">
                  {program.icon}
                </div>
              </div>

              {/* Compact Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {program.amount}
              </span>
              <p className="text-lg font-semibold text-green-600 mt-2">{program.maxAmount}</p>
              <p className="text-sm text-gray-500">{program.capacity}</p>

              {/* Short description */}
              <p className="text-gray-700 mt-4 leading-relaxed line-clamp-2">
                {program.description}
              </p>

              {/* Expandable Section */}
              {expandedIndex === index && (
                <div className="mt-4 text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                  <ul className="space-y-2">
                    {program.eligibility.map((criteria, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learn More Button */}
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="mt-6 text-sky-600 font-semibold hover:underline"
              >
                {expandedIndex === index ? "Show Less ↑" : "Learn More →"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white px-12 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all"
          >
            Check Your Eligibility Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Subsidies;
