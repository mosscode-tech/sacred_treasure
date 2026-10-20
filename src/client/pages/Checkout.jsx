// src/client/pages/Checkout.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useClientAuth } from '../context/ClientAuthContext';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiLock } from 'react-icons/fi';

const KENYAN_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", 
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", 
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", 
  "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", 
  "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", 
  "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi", "Trans Nzoia", 
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const COURIER_OPTIONS = [
  "Wells Fargo",
  "G4S Courier",
  "Ferdinand / Easy Coach Parcel",
  "Modern Coast Parcel",
  "Rider Delivery (Nairobi Only)"
];

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { clientUser } = useClientAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: clientUser?.email || '',
    phone: '',
    county: '',
    town: '',
    courier: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Kenyan Phone format: 07/01 (10 digits), +254 or 254 (12-13 digits)
  const validateKenyanPhone = (phone) => {
    const cleaned = phone.replace(/[\s+]/g, ''); // remove spaces and plus sign
    const localRegex = /^(07|01)\d{8}$/;          // e.g., 0712345678 or 0112345678
    const intlRegex = /^254(7|1)\d{8}$/;         // e.g., 254712345678

    return localRegex.test(cleaned) || intlRegex.test(cleaned);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!validateKenyanPhone(formData.phone)) {
      toast.error("Please enter a valid Kenyan phone number (e.g., 0712345678 or 254712345678).");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        customer: formData,
        items: cart,
        totalAmount: totalPrice,
        status: 'Pending',
        createdAt: serverTimestamp(),
        userId: clientUser ? clientUser.uid : 'guest'
      };

      await addDoc(collection(db, "orders"), orderPayload);
      
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/client/orders');
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some sacred artifacts before checking out.</p>
        <Link to="/" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 w-fit">
          <FiArrowLeft /> Back to Storefront
        </Link>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
          <FiLock className="text-blue-600" /> Secure Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delivery Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Delivery Information</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  required 
                  value={formData.fullName} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (M-Pesa / Contact)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="07XXXXXXXX or 2547XXXXXXXX"
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Format: 07XXXXXXXX, 01XXXXXXXX, or 254XXXXXXXXX</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <select 
                    name="county" 
                    required 
                    value={formData.county} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                  >
                    <option value="">Select County</option>
                    {KENYAN_COUNTIES.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
                  <input 
                    type="text" 
                    name="town" 
                    required 
                    value={formData.town} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Courier Service</label>
                <input 
                  type="text" 
                  name="courier" 
                  list="courier-options"
                  required 
                  placeholder="Select or type custom courier..."
                  value={formData.courier} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                />
                <datalist id="courier-options">
                  {COURIER_OPTIONS.map(courier => (
                    <option key={courier} value={courier} />
                  ))}
                </datalist>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                <span>{loading ? 'Processing Order...' : `Place Order (Ksh. ${totalPrice.toLocaleString()})`}</span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto mb-4">
              {cart.map(item => (
                <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-10 h-10 object-cover rounded-lg" />}
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">Ksh. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Ksh. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Courier Shipping</span>
                <span>Calculated at dispatch</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>Ksh. {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}