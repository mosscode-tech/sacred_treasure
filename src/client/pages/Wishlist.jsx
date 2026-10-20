// src/client/pages/Wishlist.jsx
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 w-fit">
          <FiArrowLeft /> Back to Storefront
        </Link>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
          <FiHeart className="text-red-500 fill-current" /> My Wishlist ({wishlist.length})
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <FiHeart className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">Your wishlist is empty</h3>
            <p className="text-gray-500 text-sm mb-6">Save items you love by tapping the heart icon on any product.</p>
            <Link to="/" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
              Explore Storefront
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between relative">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-red-500 hover:bg-white shadow-md transition z-10 cursor-pointer"
                  title="Remove from wishlist"
                >
                  <FiTrash2 />
                </button>

                <div>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No Image</div>
                  )}
                  
                  <div className="p-4">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {product.category || 'General'}
                    </span>
                    <h3 className="font-bold text-gray-800 text-base mt-2 line-clamp-1">{product.title}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">${product.price}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button 
                    onClick={() => {
                      addToCart(product);
                      toggleWishlist(product); // Optional: remove from wishlist once moved to cart
                    }}
                    className="w-full py-2.5 bg-blue-600 text-white font-medium text-sm rounded-xl hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}