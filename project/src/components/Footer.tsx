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
      <div className="container mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <img src="images/solarimg2.png" alt="MAC Solar Logo" className="h-16 mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              India's leading solar energy provider, helping homeowners save money and protect the environment.
            </p>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center"><Phone className="w-4 h-4 text-sky-400 mr-2" />+91 9835659280</div>
              <div className="flex items-center"><Mail className="w-4 h-4 text-sky-400 mr-2" />skshyamkumar983@gmail.com</div>
              <div className="flex items-center"><MapPin className="w-4 h-4 text-sky-400 mr-2" />Bihar, India</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}><a href={link.href} className="text-gray-400 hover:text-sky-400">{link.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service, i) => (
                <li key={i}><a href={service.href} className="text-gray-400 hover:text-sky-400">{service.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resources.map((resource, i) => (
                <li key={i}><a href={resource.href} className="text-gray-400 hover:text-sky-400">{resource.name}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-3 mb-4 md:mb-0">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-gray-800 hover:bg-sky-600 transition">
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © 2025 MAC Solar. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-emerald-600 py-2">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-white text-sm font-medium">
            🌟 Get up to ₹78,000 subsidy + Free installation!
            <a href="#contact" className="underline ml-2 hover:text-yellow-200">Get Quote</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
