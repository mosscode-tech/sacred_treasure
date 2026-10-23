// src/client/components/ProductDetailsModal.jsx
import ReactMarkdown from 'react-markdown';
import { FiShoppingCart, FiX } from 'react-icons/fi';

export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white shadow-md transition z-20 cursor-pointer"
        >
          <FiX className="text-xl" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title} className="w-full h-72 sm:h-80 object-cover" />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">No Image Available</div>
          )}

          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.category || 'General'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{product.title}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">Ksh{product.price}</p>
                <p className="text-xs text-gray-500 mt-1">Stock available: {product.stock ?? 'N/A'}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Product Description</h4>
              <div className="prose text-gray-600 text-sm sm:text-base leading-relaxed">
                <ReactMarkdown>{product.description || 'No description provided.'}</ReactMarkdown>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}