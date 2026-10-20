// src/client/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 tracking-wide">✨ Sacred Treasure</h3>
          <p className="text-gray-500 text-sm mt-2">
            Discover rare artifacts, timeless pieces, and exclusive collections curated just for you.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600 transition">Storefront</Link></li>
            <li><Link to="/client/auth" className="hover:text-blue-600 transition">Sign In / Register</Link></li>
            <li><Link to="/admin/login" className="hover:text-blue-600 transition">Admin Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Secure Shopping</h4>
          <p className="text-gray-500 text-sm">
            Shop with peace of mind. Fast local checkout and flexible optional account management.
          </p>
        </div>
      </div>
      <div className="bg-gray-50 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Sacred Treasure. All rights reserved.
      </div>
    </footer>
  );
}