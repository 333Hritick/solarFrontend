import React, { useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

type SystemType = "onGrid" | "offGrid" | "hybrid";

type SolarPackage = {
  capacity: string;
  generation: string;
  systemCost: string;
  subsidy: string;
  netCost: string;
  emi: string;
  monthlySaving: string;
  highlight?: boolean;
};

const RATE_LISTS: Record<SystemType, SolarPackage[]> = {
  // आपकी पहले दी हुई On-grid दरें
  onGrid: [
    {
      capacity: "1 kW",
      generation: "120–140 यूनिट",
      systemCost: "₹65,000–₹80,000",
      subsidy: "₹40,000*",
      netCost: "₹25,000–₹40,000",
      emi: "₹590/माह",
      monthlySaving: "₹950–₹1,200",
    },
    {
      capacity: "2 kW",
      generation: "240–280 यूनिट",
      systemCost: "₹1,25,000–₹1,60,000",
      subsidy: "₹80,000*",
      netCost: "₹45,000–₹80,000",
      emi: "₹1,180/माह",
      monthlySaving: "₹2,000–₹2,500",
    },
    {
      capacity: "3 kW",
      generation: "360–420 यूनिट",
      systemCost: "₹1,80,000–₹2,40,000",
      subsidy: "₹98,000*",
      netCost: "₹82,000–₹1,42,000",
      emi: "₹1,850/माह",
      monthlySaving: "₹3,200–₹4,000",
      highlight: true,
    },
    {
      capacity: "5 kW",
      generation: "600–700 यूनिट",
      systemCost: "₹3,00,000–₹4,00,000",
      subsidy: "₹98,000*",
      netCost: "₹2,02,000–₹3,02,000",
      emi: "₹3,450/माह",
      monthlySaving: "₹5,500–₹6,800",
    },
    {
      capacity: "10 kW",
      generation: "1,200–1,450 यूनिट",
      systemCost: "₹5,30,000–₹8,00,000",
      subsidy: "₹98,000*",
      netCost: "₹4,32,000–₹7,02,000",
      emi: "₹7,450/माह",
      monthlySaving: "₹12,000–₹15,500",
    },
  ],

  // आपकी पहली नई तालिका: Off-grid
  offGrid: [
    {
      capacity: "1 kW",
      generation: "120–140 यूनिट",
      systemCost: "₹85,000–₹95,000",
      subsidy: "₹20,000*",
      netCost: "₹65,000–₹75,000",
      emi: "₹590/माह",
      monthlySaving: "₹950–₹1,200",
    },
    {
      capacity: "2 kW",
      generation: "240–280 यूनिट",
      systemCost: "₹1,60,000–₹1,90,000",
      subsidy: "₹40,000*",
      netCost: "₹1,20,000–₹1,50,000",
      emi: "₹1,180/माह",
      monthlySaving: "₹2,000–₹2,500",
    },
    {
      capacity: "3 kW",
      generation: "360–420 यूनिट",
      systemCost: "₹2,30,000–₹2,70,000",
      subsidy: "₹50,000*",
      netCost: "₹1,80,000–₹2,20,000",
      emi: "₹1,850/माह",
      monthlySaving: "₹3,200–₹4,000",
      highlight: true,
    },
    {
      capacity: "5 kW",
      generation: "600–700 यूनिट",
      systemCost: "₹3,80,000–₹4,50,000",
      subsidy: "₹60,000*",
      netCost: "₹3,20,000–₹3,90,000",
      emi: "₹3,450/माह",
      monthlySaving: "₹5,500–₹6,800",
    },
    {
      capacity: "10 kW",
      generation: "1,200–1,450 यूनिट",
      systemCost: "₹6,50,000–₹9,00,000",
      subsidy: "₹75,000*",
      netCost: "₹5,75,000–₹8,25,000",
      emi: "₹7,450/माह",
      monthlySaving: "₹12,000–₹15,500",
    },
  ],

  // आपकी दूसरी अलग तालिका: Hybrid
  hybrid: [
    {
      capacity: "1 kW",
      generation: "120–140 यूनिट",
      systemCost: "₹90,000–₹1,10,000",
      subsidy: "₹15,000*",
      netCost: "₹75,000–₹95,000",
      emi: "₹590/माह",
      monthlySaving: "₹950–₹1,200",
    },
    {
      capacity: "2 kW",
      generation: "240–280 यूनिट",
      systemCost: "₹1,70,000–₹2,00,000",
      subsidy: "₹30,000*",
      netCost: "₹1,40,000–₹1,70,000",
      emi: "₹1,180/माह",
      monthlySaving: "₹2,000–₹2,500",
    },
    {
      capacity: "3 kW",
      generation: "360–420 यूनिट",
      systemCost: "₹2,50,000–₹2,90,000",
      subsidy: "₹40,000*",
      netCost: "₹2,10,000–₹2,50,000",
      emi: "₹1,850/माह",
      monthlySaving: "₹3,200–₹4,000",
      highlight: true,
    },
    {
      capacity: "5 kW",
      generation: "600–700 यूनिट",
      systemCost: "₹4,20,000–₹5,00,000",
      subsidy: "₹50,000*",
      netCost: "₹3,70,000–₹4,50,000",
      emi: "₹3,450/माह",
      monthlySaving: "₹5,500–₹6,800",
    },
    {
      capacity: "10 kW",
      generation: "1,200–1,450 यूनिट",
      systemCost: "₹7,00,000–₹9,50,000",
      subsidy: "₹60,000*",
      netCost: "₹6,40,000–₹8,90,000",
      emi: "₹7,450/माह",
      monthlySaving: "₹12,000–₹15,500",
    },
  ],
};

const SYSTEM_OPTIONS: {
  id: SystemType;
  label: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "onGrid",
    label: "On-grid",
    description: "बिजली ग्रिड से जुड़ा सिस्टम",
    Icon: Zap,
  },
  {
    id: "offGrid",
    label: "Off-grid",
    description: "बैटरी के साथ स्वतंत्र सिस्टम",
    Icon: BatteryCharging,
  },
  {
    id: "hybrid",
    label: "Hybrid",
    description: "ग्रिड और बैटरी का संयोजन",
    Icon: Sun,
  },
];

const Subsidies: React.FC = () => {
  const [selectedType, setSelectedType] = useState<SystemType>("onGrid");
  const packages = RATE_LISTS[selectedType];

  return (
    <section id="subsidies" className="bg-slate-50 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
            <Sun className="h-4 w-4" />
            सोलर रेट लिस्ट और सब्सिडी
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            अपने लिए सही सोलर सिस्टम चुनें
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            On-grid, Off-grid या Hybrid सिस्टम चुनकर क्षमता, अनुमानित उत्पादन,
            कीमत, EMI और मासिक बचत देखें।
          </p>
        </header>

        {/* System type tabs */}
        <div className="mx-auto mb-7 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
          {SYSTEM_OPTIONS.map(({ id, label, description, Icon }) => {
            const isSelected = selectedType === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedType(id)}
                aria-pressed={isSelected}
                className={`rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-emerald-300"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isSelected
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <span className="mt-3 block font-bold text-slate-900">
                  {label}
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Rate table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-5 py-4 font-bold">क्षमता</th>
                  <th className="px-5 py-4 font-bold">मासिक उत्पादन</th>
                  <th className="px-5 py-4 font-bold">सिस्टम कीमत</th>
                  <th className="px-5 py-4 font-bold">सब्सिडी अनुमान*</th>
                  <th className="px-5 py-4 font-bold">सब्सिडी के बाद कीमत*</th>
                  <th className="px-5 py-4 font-bold">EMI</th>
                  <th className="px-5 py-4 font-bold">मासिक बचत*</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {packages.map((item) => (
                  <tr
                    key={`${selectedType}-${item.capacity}`}
                    className={
                      item.highlight
                        ? "bg-emerald-50/70"
                        : "transition hover:bg-slate-50"
                    }
                  >
                    <td className="whitespace-nowrap px-5 py-5 font-bold text-slate-900">
                      <span className="flex items-center gap-2">
                        {item.capacity}
                        {item.highlight && (
                          <span className="rounded-full bg-emerald-700 px-2 py-1 text-[10px] font-bold text-white">
                            लोकप्रिय
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                      {item.generation}
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-sm font-semibold text-slate-800">
                      {item.systemCost}
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-sm font-semibold text-emerald-700">
                      {item.subsidy}
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-sm font-bold text-slate-900">
                      {item.netCost}
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                      {item.emi}
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-sm font-semibold text-slate-700">
                      {item.monthlySaving}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
            मोबाइल पर पूरी तालिका देखने के लिए दाएँ-बाएँ स्क्रॉल करें।
          </p>
        </div>

        {/* Important notes */}
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-bold text-amber-950">
            कीमत, सब्सिडी और बचत के बारे में
          </h3>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            * तालिका की कीमतें, सब्सिडी, EMI और बचत आपके दिए हुए अनुमान हैं।
            अंतिम राशि साइट सर्वे, उपकरण, राज्य, बिजली दर और बैंक की शर्तों के
            अनुसार बदल सकती है। Off-grid सिस्टम की कीमत में बैटरी शामिल है या
            नहीं, यह अपने कोटेशन में साफ़ लिखें।
          </p>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            PM Surya Ghar की केंद्रीय सहायता पात्र आवासीय, ग्रिड-कनेक्टेड
            सिस्टम और लागू नियमों पर निर्भर करती है। Off-grid या Hybrid सिस्टम
            की पात्रता और बिहार की अतिरिक्त सहायता की पुष्टि संबंधित DISCOM या
            योजना पोर्टल से करें। व्यावसायिक सिस्टम की पात्रता अलग हो सकती है।
          </p>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-emerald-950 p-6 text-center text-white sm:flex-row sm:text-left sm:p-8">
          <div>
            <h3 className="text-xl font-bold">
              अपने घर के लिए सही कोटेशन चाहिए?
            </h3>
            <p className="mt-2 text-sm text-emerald-100">
              सिस्टम क्षमता और इंस्टॉलेशन की जानकारी के लिए हमारी टीम से बात
              करें।
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            मुफ्त कोटेशन लें
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
          PM Surya Ghar की प्रकाशित केंद्रीय सब्सिडी सामान्य श्रेणी में अधिकतम
          ₹78,000 और विशेष श्रेणी में ₹85,800 तक बताई गई है। आपकी सूची में
          दर्शाई गई सब्सिडी राशि इससे अलग है; उसे प्रकाशित करने से पहले लागू
          केंद्रीय और बिहार राज्य सहायता से मिलान करें।{" "}
          <a
            href="https://pmsuryaghar.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-emerald-700 underline"
          >
            आधिकारिक PM Surya Ghar पोर्टल
          </a>
        </p>
      </div>
    </section>
  );
};

export default Subsidies;