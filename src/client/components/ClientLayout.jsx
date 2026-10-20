// src/client/components/ClientLayout.jsx
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function ClientLayout() {
  const { categories } = useProducts();
  const { cart, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  // Optional: check if we are on the storefront to show category filters, 
  // or keep them accessible globally.
  const isStorefront = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={isStorefront ? categories : ['All']}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalItems={totalItems}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="flex-1 w-full">
        {/* Outlet renders whatever active child route matches (Checkout, Wishlist, Orders, Storefront) */}
        <Outlet context={{ searchQuery, selectedCategory, setSelectedCategory }} />
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}