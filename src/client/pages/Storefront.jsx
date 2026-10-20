// src/client/pages/Storefront.jsx
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';

export default function Storefront() {
  const { products, loading } = useProducts();
  const { searchQuery, selectedCategory } = useOutletContext(); // Grabs filters from Navbar layout
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Loading Sacred Treasures...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onSelect={() => setSelectedProduct(product)}
            onAddToCart={addToCart}
            isWishlisted={isInWishlist(product.id)}
            onToggleWishlist={toggleWishlist}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-gray-500 text-base sm:text-lg">No products found matching your search.</p>
        </div>
      )}

      <ProductDetailsModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}