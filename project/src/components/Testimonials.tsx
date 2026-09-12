import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { X } from "lucide-react";

const OurClients = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [popupData, setPopupData] = useState<{
    title: string;
    description1: string;
    description2: string;
    image: string;
  } | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Accessibility Fix
  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll(".slick-slide").forEach((slide) => {
        if (slide.getAttribute("aria-hidden") === "true") {
          slide.setAttribute("inert", "");
        } else {
          slide.removeAttribute("inert");
        }
      });
    });

    const slider = document.querySelector(".slick-slider");
    if (slider) {
      observer.observe(slider, {
        attributes: true,
        subtree: true,
        attributeFilter: ["aria-hidden"],
      });
    }

    return () => observer.disconnect();
  }, []);

  // Slides data
  const slides = [
    {
      title: "Customer Story",
      description1: "Thousands of homeowners trust MAC Solar for clean and reliable energy.",
      description2: "Save up to 85% on electricity bills with long-lasting solar power.",
      image: "/images/nandkishor.jpg",
    },
    {
      title: "Happy Customers",
      description1: "We deliver high-quality solar systems with trusted support.",
      description2: "Customers love our fast installation and transparent service.",
      image: "/images/customer2.jpeg",
    },
    {
      title: "Trusted by Many",
      description1: "MAC Solar has built a community of satisfied customers nationwide.",
      description2: "Join thousands of families saving money and going green.",
      image: "/images/customer3.jpeg",
    },
  ];

  return (
    <section className="bg-[#b9dadd] py-16">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
        
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 py-8 tracking-wide">
          Our Happy Customers
        </h2>

        {/* Slider Section */}
        <div className="px-6 pb-8">
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-md p-6 gap-6">
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{slide.title}</h3>
                    <p className="text-gray-600 mb-2">{slide.description1}</p>
                    <p className="text-gray-600">{slide.description2}</p>
                  </div>
                  {/* Image clickable */}
                  <div className="flex-shrink-0 cursor-pointer" onClick={() => setPopupData(slide)}>
                    <img
                      src={slide.image}
                      alt="Customer"
                      className="h-48 w-auto object-cover rounded-lg shadow hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Logos Section */}
        <div className="border-t py-6 px-6 flex flex-wrap justify-center gap-6 items-center">
          <img src="/images/nandkishor.jpg" className="h-8 opacity-70 rounded" />
          <img src="/images/solaruser.webp" className="h-8 opacity-70 rounded" />
          <img src="/images/nandkishor.jpg" className="h-8 opacity-70 rounded" />
        </div>
      </div>

      {/* Popup Modal */}
      {popupData && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
    <div className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6">
      <button
        aria-label="Close"
        className="absolute top-4 right-4 cursor-pointer bg-gray-100 rounded-full p-2 shadow hover:bg-gray-200 transition"
        onClick={() => setPopupData(null)}
      >
        <X className="w-6 h-6 text-gray-800" />
      </button>

      <img
        src={popupData.image}
        alt="Customer"
        className="w-full max-h-[60vh] object-contain rounded-lg mb-6"
      />
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{popupData.title}</h3>
      <p className="text-gray-700 mb-2">{popupData.description1}</p>
      <p className="text-gray-700">{popupData.description2}</p>
    </div>
  </div>
)}



    </section>
  );
};

export default OurClients;
