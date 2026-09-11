import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Process', href: '#process' },
  ];

  const services = [
    { name: 'Residential Solar', href: '#' },
    { name: 'Commercial Solar', href: '#' },
    { name: 'Solar Maintenance', href: '#' },
    { name: 'Battery Storage', href: '#' },
  ];

  const resources = [
    { name: 'Government Subsidies', href: '#subsidies' },
    { name: 'Solar Calculator', href: '#calculator' },
    { name: 'Installation Process', href: '#process' },
    { name: 'Customer Reviews', href: '#Testimonials' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img src="images/solarimg2.png" alt="MAC Solar Logo" className="h-20 filter brightness-100 transition-all" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India's leading solar energy provider, helping homeowners save money and protect the environment with clean, renewable solar power solutions.
            </p>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center"><Phone className="w-5 h-5 text-sky-400 mr-3" />+91 9835659280</div>
              <div className="flex items-center"><Mail className="w-5 h-5 text-sky-400 mr-3" />skshyamkumar983@gmail.com</div>
              <div className="flex items-center"><MapPin className="w-5 h-5 text-sky-400 mr-3" />Bihar, India</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}><a href={link.href} className="text-gray-400 hover:text-sky-400 hover:underline transition">{link.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}><a href={service.href} className="text-gray-400 hover:text-sky-400 hover:underline transition">{service.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource, i) => (
                <li key={i}><a href={resource.href} className="text-gray-400 hover:text-sky-400 hover:underline transition">{resource.name}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-gray-800 hover:bg-sky-600 transition">
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
              © 2025 MAC Solar. All rights reserved. Powering India's solar revolution.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-emerald-600 py-3">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-white font-semibold text-sm md:text-base">
            🌟 Special Offer: Get up to ₹78,000 government subsidy + Free installation!
            <a href="#contact" className="underline ml-2 hover:text-yellow-200">Get Quote Now</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
