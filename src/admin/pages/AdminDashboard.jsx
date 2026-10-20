// src/admin/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMenu, FiX } from 'react-icons/fi';

import AdminSidebar from '../components/AdminSidebar';
import AdminOrders from '../components/AdminOrders';
import AdminUsers from '../components/AdminUsers';
import AdminVisitors from '../components/AdminVisitors';
import AdminProducts from '../components/AdminProducts';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdminData() {
      try {
        // 1. Fetch Orders from Database
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        ordersList.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setOrders(ordersList);

        // 2. Fetch Users from Database
        try {
          const usersSnapshot = await getDocs(collection(db, "users"));
          setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch {
          setUsers([]);
        }

        // 3. Fetch Visitors / Telemetry from Database
        try {
          const visitorsSnapshot = await getDocs(collection(db, "visitors"));
          setVisitors(visitorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch {
          setVisitors([]);
        }

        // 4. Fetch Products from Database
        const productsSnapshot = await getDocs(collection(db, "products"));
        setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (err) {
        console.error("Error fetching admin data:", err);
        toast.error("Failed to load live database data.");
      } finally {
        setLoading(false);
      }
    }

    fetchAdminData();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating order:", err);
      toast.error("Failed to update status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast.info("Logged out from admin panel");
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-medium">
        Loading Admin Dashboard...
      </div>
    );
  }

  const counts = {
    orders: orders.length,
    users: users.length,
    visitors: visitors.length,
    products: products.length
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-30 shrink-0">
        <h1 className="font-bold text-gray-800 text-sm truncate">✨ Sacred Treasure Admin</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-2 rounded-xl bg-gray-100 text-gray-700 cursor-pointer"
        >
          {isSidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {/* Sidebar Component */}
      <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={counts}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content View with enforced width constraints */}
      <main className="flex-1 p-4 sm:p-8 min-w-0 overflow-x-hidden">
        <div className="max-w-6xl mx-auto w-full min-w-0">
          {activeTab === 'orders' && <AdminOrders orders={orders} onUpdateStatus={handleUpdateOrderStatus} />}
          {activeTab === 'users' && <AdminUsers users={users} />}
          {activeTab === 'visitors' && <AdminVisitors visitors={visitors} />}
          {activeTab === 'products' && <AdminProducts products={products} setProducts={setProducts} />}
        </div>
      </main>
    </div>
  );
}