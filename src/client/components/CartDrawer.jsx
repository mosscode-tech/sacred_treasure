// src/client/components/CartDrawer.jsx
import { FiShoppingCart, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose, cart, totalItems, totalPrice, updateQuantity, removeFromCart }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FiShoppingCart /> Your Cart ({totalItems})
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Your cart is currently empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center text-xs text-gray-400">No Img</div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm truncate">{item.title}</h4>
                    <p className="text-sm font-bold text-gray-900">Ksh. {item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center font-bold text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center font-bold text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-medium px-2 py-1 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-600">Total:</span>
                <span className="text-xl font-bold text-gray-900">Ksh. {totalPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}