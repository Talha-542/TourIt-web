// New Footer Component
import { Button } from "../button";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & About */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.svg" alt="TourIt Logo" className="h-12" />
            </Link>
            <p className="text-gray-400 mb-6">
              Revolutionizing travel planning with AI-powered itineraries tailored to your preferences, budget, and interests.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/create-trip" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">Create Trip</Link>
              </li>
              {/* <li>
                <Link to="/explore" className="text-gray-400 hover:text-primary transition-colors">Explore Destinations</Link>
              </li> */}
              <li>
                <Link to="/about" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Destinations */}
          {/* <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Popular Destinations</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/destination/paris" className="text-gray-400 hover:text-primary transition-colors">Paris, France</Link>
              </li>
              <li>
                <Link to="/destination/bali" className="text-gray-400 hover:text-primary transition-colors">Bali, Indonesia</Link>
              </li>
              <li>
                <Link to="/destination/tokyo" className="text-gray-400 hover:text-primary transition-colors">Tokyo, Japan</Link>
              </li>
              <li>
                <Link to="/destination/santorini" className="text-gray-400 hover:text-primary transition-colors">Santorini, Greece</Link>
              </li>
              <li>
                <Link to="/destination/new-york" className="text-gray-400 hover:text-primary transition-colors">New York, USA</Link>
              </li>
            </ul>
          </div> */}

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                <span className="text-gray-400">123 Travel Street, San Francisco, CA 94103, USA</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-primary mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <span className="text-gray-400">support@TourIt.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} TourIt. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" onClick={scrollToTop} className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</Link>
            <Link to="/privacy" onClick={scrollToTop} className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</Link>
            <Link to="/cookies" onClick={scrollToTop} className="text-gray-500 hover:text-gray-300 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;