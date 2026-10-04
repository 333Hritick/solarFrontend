import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = "919835659280"; // your number with country code
  const message = `Hello, I am interested in booking a free site survey.
Please share details about:
- Subsidy eligibility
- Installation process
- Available solar panel brands (Adani, Waaree, Tata)
Thank you!`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center z-[9999]"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default FloatingWhatsApp;
