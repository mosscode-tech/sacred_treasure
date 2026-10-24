// src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './client/context/CartContext';
import { ClientAuthProvider } from './client/context/ClientAuthContext';
import { WishlistProvider } from './client/context/WishlistContext';
import { ProductProvider } from './client/context/ProductContext';

import ClientLayout from './client/components/ClientLayout';
import Storefront from './client/pages/Storefront';
import ClientAuth from './client/pages/ClientAuth';
import ClientRegister from './client/pages/ClientRegister';
import Checkout from './client/pages/Checkout';
import Wishlist from './client/pages/Wishlist';
import MyOrders from './client/pages/MyOrders';
import ProtectedRoute from './admin/components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'));

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ClientAuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ProductProvider>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-medium">
                  Loading Sacred Treasure...
                </div>
              }>
                <Routes>
                  {/* Client Pages wrapped inside ClientLayout (Navbar + Footer on all of them) */}
                  <Route element={<ClientLayout />}>
                    <Route path="/" element={<Storefront />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/client/wishlist" element={<Wishlist />} />
                    <Route path="/client/orders" element={<MyOrders />} />
                    <Route path="/client/auth" element={<ClientAuth />} />
                    <Route path="/client/register" element={<ClientRegister />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="/admin2026/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin2026"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Suspense>
              <ToastContainer position="bottom-right" autoClose={3000} />
            </ProductProvider>
          </CartProvider>
        </WishlistProvider>
      </ClientAuthProvider>
    </BrowserRouter>
  );
}