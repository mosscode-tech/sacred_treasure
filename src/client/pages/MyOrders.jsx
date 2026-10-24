// src/client/pages/MyOrders.jsx
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useClientAuth } from '../context/ClientAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiClock } from 'react-icons/fi';

export default function MyOrders() {
  const { clientUser, loading: authLoading } = useClientAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect unauthenticated users immediately
    if (!authLoading && !clientUser) {
      navigate('/client/auth');
      return;
    }

    async function fetchUserOrders() {
      if (!clientUser) return;
      try {
        const q = query(
          collection(db, "orders"), 
          where("userId", "==", clientUser.uid)
        );
        
        const snapshot = await getDocs(q);
        const userOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        userOrders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching user orders:", err);
      } finally {
        setLoading(false);
      }
    }

    if (clientUser) {
      fetchUserOrders();
    }
  }, [clientUser, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 w-fit">
          <FiArrowLeft /> Back to Storefront
        </Link>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
          <FiPackage className="text-blue-600" /> My Order History
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <FiClock className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">No orders found</h3>
            <p className="text-gray-500 text-sm mb-6">You haven't placed any orders with this account yet.</p>
            <Link to="/" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 gap-2">
                  <div>
                    <span className="text-xs font-semibold text-gray-400">Order ID: {order.id}</span>
                    <p className="text-xs text-gray-500">
                      Placed on: {order.createdAt?.toDate ? new Date(order.createdAt.toDate()).toLocaleDateString() : 'Recent'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    order.status === 'Completed' ? 'bg-green-50 text-green-600' :
                    order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {order.status || 'Pending'}
                  </span>
                </div>

                <div className="py-4 divide-y divide-gray-50">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />}
                        <div>
                          <p className="font-semibold text-gray-800">{item.title}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">Ksh. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total Paid</span>
                  <span className="text-lg font-extrabold text-gray-900">Ksh. {order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}