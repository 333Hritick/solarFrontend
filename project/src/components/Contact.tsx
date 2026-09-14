import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { createQuote } from "../api";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    monthlyBill: "",
    rooftopArea: "",
    message: "",
  });

  const [eligibilityMessage, setEligibilityMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkEligibility = (data: any) => {
    const area = parseFloat(data.rooftopArea);
    const bill = parseFloat(data.monthlyBill);

    if (isNaN(area) || isNaN(bill)) {
      return "⚠️ Please enter valid rooftop area and monthly bill.";
    }

    if (area < 100) {
      return "❌ Your rooftop area is too small for solar installation.";
    }

    if ((data as any).roofShade === "Yes") {
      return "⚠️ Your roof has shade, solar efficiency may be low.";
    }

    const estimatedSavings = Math.round(bill * 0.6);
    return `✅ Eligible! You could save around ₹${estimatedSavings} per month on your bill.`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isSubmitting) return;

  // ✅ Step 1: Immediate feedback (shows instantly)
  toast.success("✅ Thanks for submitting! Your request is being processed...");

  const eligibilityResult = checkEligibility(formData);
  setEligibilityMessage(eligibilityResult);

  setIsSubmitting(true);
  const toastId = toast.loading("⏳ Sending data to server...");

  try {
    // Step 2: Backend call
    const response = await createQuote(formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Quote created:", response.data);

    // 🎉 Step 3: Backend confirmation
    toast.success(
      "🎉 Your form has been submitted successfully! Please check your email for confirmation.",
      { id: toastId }
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      district: "",
      monthlyBill: "",
      rooftopArea: "",
      message: "",
    });
  } catch (err: any) {
    console.error("Error creating quote:", err.response?.data || err.message);
    toast.error("❌ Something went wrong. Please try again.", { id: toastId });
  } finally {
    setTimeout(() => {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }, 1500);
  }
};


  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-sky-500" />,
      title: "Phone",
      details: ["+91 9835659280"],
    },
    {
      icon: <Mail className="w-6 h-6 text-sky-500" />,
      title: "Email",
      details: ["skshyamkumar983@gmail.com"],
    },
    {
      icon: <MapPin className="w-6 h-6 text-sky-500" />,
      title: "Office",
      details: ["Ashiyana Digha Roaad", "India, Bihar Patna - 800025"],
    },
    {
      icon: <Clock className="w-6 h-6 text-sky-500" />,
      title: "Hours",
      details: ["Mon-Sat: 9:00 AM - 6:00 PM", "Sun: 10:00 AM - 4:00 PM"],
    },
  ];

  const biharDistricts = [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai",
    "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran",
    "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
    "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura",
    "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada",
    "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
    "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan",
    "Supaul", "Vaishali", "West Champaran"
  ];
  return (
    <section id="contact" className="py-12 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Get Your Free Solar Consultation
      </h2>
      <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Ready to start your solar journey? Our experts will design the perfect solar solution for your home.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Request Your Personalized Quote
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="Full Name *"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="Email *"
            />
          </div>

          {/* Phone + District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="Phone *"
            />
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Select District *</option>
              {biharDistricts.map((dist, index) => (
                <option key={index} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Bill + Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="monthlyBill"
              value={formData.monthlyBill}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="Monthly Bill (₹)"
            />
            <input
              type="number"
              name="rooftopArea"
              value={formData.rooftopArea}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="Rooftop Area (sq ft)"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            placeholder="Additional message..."
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-sky-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
            } text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <span className="loader mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Get Free Quote
              </>
            )}
          </button>
        </form>

        {eligibilityMessage && (
          <div className="mt-3 p-3 bg-gray-100 rounded-lg text-center text-sm font-medium">
            {eligibilityMessage}
          </div>
        )}
      </div>

      {/* Contact Info + Why Choose Us */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-white/20 rounded-lg p-2 mr-3">{info.icon}</div>
                <div>
                  <h4 className="font-semibold text-white">{info.title}</h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sky-100 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose MAC Solar?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Free site survey and system design</li>
            <li>✅ Maximum government subsidy assistance</li>
            <li>✅ Professional installation in 1-3 days</li>
            <li>✅ 25-year comprehensive warranty</li>
            <li>✅ 24/7 monitoring and support</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Contact;