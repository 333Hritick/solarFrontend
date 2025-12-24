import { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurClients = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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

  return (
    <section className="bg-[#b9dadd] py-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
        
        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold text-gray-800 py-10 tracking-wide">
          Our Happy Customers
        </h2>

        {/* Slider Section */}
        <div className="px-4 pb-10">
          <Slider ref={sliderRef} {...settings}>

            {/* Slide 1 */}
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
                
                {/* Text */}
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Our Clients
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    Thousands of homeowners trust MAC Solar for clean and
                    reliable energy solutions.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Save up to 85% on electricity bills with long-lasting solar
                    power.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition">
                    READ MORE
                  </button>
                </div>

                {/* FULL IMAGE (LARGE, NO CROP) */}
                <div className="flex items-center justify-center bg-gray-100 rounded-r-lg p-2">
                  <img
                    src="/images/nandkishor.jpg"
                    alt="Customer"
                    className="max-h-[480px] lg:max-h-[520px] w-auto object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Happy Customers
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    We deliver high-quality solar systems with trusted support.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our customers love our fast installation and transparent
                    service.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition">
                    READ MORE
                  </button>
                </div>

                <div className="flex items-center justify-center bg-gray-100 rounded-r-lg p-2">
                  <img
                    src="/images/customer2.jpeg"
                    alt="Customer"
                    className="max-h-[480px] lg:max-h-[520px] w-auto object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Trusted by Many
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    MAC Solar has built a community of satisfied customers
                    nationwide.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Join thousands of families saving money and going green.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition">
                    READ MORE
                  </button>
                </div>

                <div className="flex items-center justify-center bg-gray-100 rounded-r-lg p-2">
                  <img
                    src="/images/customer3.jpeg"
                    alt="Customer"
                    className="max-h-[480px] lg:max-h-[520px] w-auto object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

          </Slider>
        </div>

        {/* Logos Section */}
        <div className="border-t py-10 px-6 flex flex-wrap justify-center gap-10 items-center">
          <img src="/images/nandkishor.jpg" className="h-10 opacity-60 rounded" />
          <img src="/images/solaruser.webp" className="h-10 opacity-60 rounded" />
          <img src="/images/nandkishor.jpg" className="h-10 opacity-60 rounded" />
        </div>
      </div>
    </section>
  );
};

export default OurClients;
