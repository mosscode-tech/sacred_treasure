// src/client/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiShield, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand & Mission */}
        <div>
          <h3 className="text-lg font-extrabold text-gray-900 tracking-wide flex items-center gap-2">
            ✨ Sacred Treasure
          </h3>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Discover rare artifacts, timeless pieces, and exclusive spiritual collections curated to enrich your faith and space.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-xs uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600 transition">Shop</Link></li>
            <li><Link to="/client/auth" className="hover:text-blue-600 transition">Sign In / Register</Link></li>
            <li><Link to="/client/orders" className="hover:text-blue-600 transition">My Orders</Link></li>
          </ul>
        </div>

        {/* Contact & Locations */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-xs uppercase tracking-wider">Contact & Locations</h4>
          <div className="space-y-3 text-sm text-gray-500">
            <div className="flex items-start gap-2.5">
              <FiPhone className="text-blue-600 mt-1 shrink-0" />
              <div>
                <p>+254 22824619</p>
                <p>+254 140333434</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <FiMapPin className="text-blue-600 mt-1 shrink-0" />
              <div>
                <p className="font-medium text-gray-700">Nairobi Locations:</p>
                <p className="text-xs mt-0.5">• St. Peter Claver's Parish</p>
                <p className="text-xs mt-0.5">• Ruathia House, Stall No. 4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secure Shopping */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <FiShield className="text-blue-600" /> Secure Shopping
          </h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Shop with absolute peace of mind. Fast local checkout, reliable physical store pickups, and flexible optional account management.
          </p>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-gray-50 py-5 border-t border-gray-100 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-1 px-4">
        <span>&copy; {new Date().getFullYear()} Sacred Treasure. All rights reserved.</span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1 text-gray-500">
          Crafted with <FiHeart className="text-red-500 fill-red-500" /> for the faithful
        </span>
      </div>
    </footer>
  );
}