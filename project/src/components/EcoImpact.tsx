import React from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, PanelsTopLeft } from "lucide-react";

type Brand = {
  name: string;
  example: string;
  technology: string;
  power: string;
  efficiency: string;
  warranty: string;
  price: string;
  image: string;
  website: string;
  color: string;
};

const brands: Brand[] = [
  {
    name: "Waaree Energies",
    example: "3.2 kW Radiance आवासीय सिस्टम",
    technology: "N-Type bifacial TOPCon, DCR मॉड्यूल",
    power: "6 × 560 Wp मॉड्यूल",
    efficiency: "चुने हुए मॉड्यूल मॉडल की डेटाशीट देखें",
    warranty:
      "इस किट के लिए: मॉड्यूल 12 वर्ष उत्पाद / 30 वर्ष पावर; इन्वर्टर 8 वर्ष",
    price: "अपना कोटेशन जोड़ें",
    image: "/images/ware.webp",
    website: "https://www.waaree.com/residential-rooftop-solar/",
    color: "border-amber-200 bg-amber-50 text-amber-800",
  },
  {
    name: "Adani Solar",
    example: "Shine TOPCon सीरीज़",
    technology: "TOPCon और MonoPERC, bifacial और monofacial विकल्प",
    power: "उत्पाद लाइन में लगभग 535–660 Wp; मॉडल के अनुसार",
    efficiency:
      "आधिकारिक उत्पाद पेज पर सीरीज़ के अनुसार 21–22% रेंज; TOPCon उदाहरण 22.3%",
    warranty:
      "पावर वारंटी 30 वर्ष तक; चुने हुए मॉडल का वारंटी कार्ड जाँचें",
    price: "अपना कोटेशन जोड़ें",
    image: "/images/addani.jpg",
    website: "https://www.adanisolar.com/product",
    color: "border-sky-200 bg-sky-50 text-sky-800",
  },
  {
    name: "Tata Power Solar",
    example: "TP580H G10NB उदाहरण",
    technology: "TOPCon bifacial, glass-to-glass मॉड्यूल",
    power: "TP580H मॉडल; वर्तमान डेटाशीट से पुष्टि करें",
    efficiency: "चुने हुए मॉड्यूल मॉडल की डेटाशीट देखें",
    warranty: "मॉडल की मौजूदा वारंटी शर्तें कोटेशन के साथ जाँचें",
    price: "अपना कोटेशन जोड़ें",
    image: "/images/tata.jpg",
    website: "https://www.tatapowersolar.com/",
    color: "border-indigo-200 bg-indigo-50 text-indigo-800",
  },
  {
    name: "Vikram Solar",
    example: "Hypersol G12R उदाहरण",
    technology: "N-Type TOPCon bifacial, glass-to-glass",
    power: "610–635 Wp मॉडल",
    efficiency: "अधिकतम 23.51% तक (सीरीज़ के अनुसार)",
    warranty: "इस सीरीज़ के लिए: 12 वर्ष उत्पाद / 30 वर्ष पावर",
    price: "अपना कोटेशन जोड़ें",
    image: "/images/vikramm.jpg",
    website:
      "https://www.vikramsolar.com/pv-modules/hypersol/hypersol-600-625w-132-hc-cell/",
    color: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
];

const BrandComparison: React.FC = () => {
  return (
    <section
      id="brand-comparison"
      className="bg-white px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
            <PanelsTopLeft className="h-4 w-4" />
            सोलर ब्रांड की तुलना
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Waaree, Adani और अन्य ब्रांड
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            पैनल चुनते समय ब्रांड के साथ-साथ सटीक मॉडल, क्षमता, वारंटी,
            प्रमाणन और इंस्टॉलर का लिखित कोटेशन भी देखें।
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {brands.map((brand) => (
            <article
              key={brand.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Solar panel picture */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={brand.image}
                  alt={`${brand.name} सोलर पैनल`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/images/panel.jpg";
                  }}
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow">
                  {brand.name}
                </span>
              </div>

              <div className={`border-b p-5 ${brand.color}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-extrabold">{brand.name}</h3>
                  <BadgeCheck className="h-5 w-5 shrink-0" />
                </div>
                <p className="mt-2 text-sm font-medium opacity-80">
                  उत्पाद उदाहरण: {brand.example}
                </p>
              </div>

              <dl className="flex-1 divide-y divide-slate-100 px-5">
                <div className="py-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    तकनीक
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-700">
                    {brand.technology}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    क्षमता
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-700">
                    {brand.power}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    दक्षता
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-700">
                    {brand.efficiency}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    वारंटी
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-700">
                    {brand.warranty}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    आपकी सिस्टम कीमत
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-900">
                    {brand.price}
                  </dd>
                </div>
              </dl>

              <div className="p-5 pt-0">
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
                >
                  आधिकारिक जानकारी देखें
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-bold text-amber-950">
            तुलना करते समय ये बातें जाँचें
          </h3>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            ऊपर दिए गए आँकड़े चुनिंदा उत्पादों के उदाहरण हैं; हर ब्रांड के सभी
            मॉडल पर लागू नहीं होते। अंतिम चुनाव से पहले समान क्षमता और तकनीक
            वाले मॉडल की डेटाशीट, जहाँ लागू हो DCR/ALMM स्थिति, उत्पाद व पावर
            वारंटी, इन्वर्टर वारंटी, इंस्टॉलेशन लागत और स्थानीय सेवा की तुलना
            करें।
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-emerald-950 p-6 text-center text-white sm:flex-row sm:text-left sm:p-8">
          <div>
            <h3 className="text-xl font-bold">
              ब्रांड और मॉडल चुनने में मदद चाहिए?
            </h3>
            <p className="mt-2 text-sm text-emerald-100">
              अपने बिजली बिल और छत की जानकारी के साथ हमसे बात करें।
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
            सलाह लें
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandComparison;