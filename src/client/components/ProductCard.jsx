// src/client/components/ProductCard.jsx
import ReactMarkdown from 'react-markdown';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

export default function ProductCard({ product, onSelect, onAddToCart, isWishlisted, onToggleWishlist }) {
  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition cursor-pointer relative"
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition z-10 cursor-pointer ${
          isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-600 hover:text-red-500'
        }`}
      >
        <FiHeart className={isWishlisted ? 'fill-current' : ''} />
      </button>

      <div>
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            loading="lazy"
            className="w-full h-48 sm:h-52 object-cover" 
          />
        ) : (
          <div className="w-full h-48 sm:h-52 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No Image</div>
        )}
        
        <div className="p-4">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {product.category || 'General'}
          </span>
          <h3 className="font-bold text-gray-800 text-base sm:text-lg mt-2 line-clamp-1">{product.title}</h3>
          <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">${product.price}</p>
          
          <div className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 overflow-hidden prose">
            <ReactMarkdown>{product.description}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full py-2.5 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-blue-600 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <FiShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}