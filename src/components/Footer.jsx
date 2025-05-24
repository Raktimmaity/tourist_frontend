import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-3xl font-bold mb-4">ExploreMore</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Your trusted travel partner. Discover beautiful places, book exciting trips, and create unforgettable memories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline hover:text-yellow-300 transition">Home</Link></li>
            <li><Link to="/package" className="hover:underline hover:text-yellow-300 transition">Packages</Link></li>
            <li><Link to="/tours" className="hover:underline hover:text-yellow-300 transition">Tours</Link></li>
            <li><Link to="/trips" className="hover:underline hover:text-yellow-300 transition">Customized Trip</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Email: <span className="font-medium">support@exploremore.com</span></li>
            <li>Phone: <span className="font-medium">+00000000000</span></li>
            <li>Location: <span className="font-medium">Adventure City, World</span></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 text-xl transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 text-xl transition">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 text-xl transition">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 text-xl transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/30 text-center text-sm pt-6">
        &copy; {new Date().getFullYear()} Explore More. All rights reserved
      </div>
    </footer>
  );
}
