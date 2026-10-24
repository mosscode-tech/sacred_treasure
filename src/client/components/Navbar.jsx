// src/client/components/Navbar.jsx
import { useState } from 'react';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser, FiPackage, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useClientAuth } from '../context/ClientAuthContext';
import logoSvg from '../../assets/favicon.svg';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  totalItems, 
  setIsCartOpen 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { clientUser, logout } = useClientAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
        {/* Brand Title */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide flex items-center gap-2">
        <img src={logoSvg} alt="Sacred Treasure Logo" className="w-8 h-8 object-contain shrink-0" />
           <span className="truncate">Sacred Treasure</span>
        </Link>
        
        {/* Desktop Search Bar */}
        <div className="hidden md:block relative w-96">
          <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-lg" />
          <input 
            type="text"
            placeholder="Search sacred artifacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>

        {/* Action Buttons (Wishlist, Cart, Account, Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Shortcut */}
          <Link 
            to="/client/wishlist" 
            className="hidden sm:flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 transition"
            title="Wishlist"
          >
            <FiHeart className="text-lg text-red-500" />
            <span className="hidden lg:inline">Wishlist</span>
          </Link>

          {/* Account link / profile shortcut */}
          {clientUser ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link 
                to="/client/orders" 
                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl text-sm font-medium text-blue-700 transition"
              >
                <FiPackage /> Orders
              </Link>
              <button 
                onClick={logout}
                className="text-xs text-gray-500 hover:text-red-600 font-medium transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              to="/client/auth" 
              className="hidden sm:flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 transition"
            >
              <FiUser className="text-lg text-gray-500" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Cart Toggle Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-gray-900 text-white hover:bg-blue-600 px-3.5 py-2 rounded-xl font-medium text-sm transition cursor-pointer shadow-xs"
          >
            <FiShoppingCart className="text-base" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
          >
            {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Search & Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 shadow-lg">
          <div className="relative w-full">
            <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-lg" />
            <input 
              type="text"
              placeholder="Search sacred artifacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Link 
              to="/client/wishlist" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700"
            >
              <FiHeart className="text-red-500" /> My Wishlist
            </Link>

            {clientUser ? (
              <>
                <div className="py-1 text-xs text-gray-500 truncate">Signed in as: <span className="font-semibold text-gray-700">{clientUser.email}</span></div>
                <Link 
                  to="/client/orders" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-medium text-blue-600"
                >
                  <FiPackage /> My Orders
                </Link>
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                  className="flex items-center gap-2 py-2 text-sm font-medium text-red-500 text-left cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/client/auth" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm font-medium text-blue-600"
              >
                <FiUser /> Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Category Filter Scroll Bar */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}