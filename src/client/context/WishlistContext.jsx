// src/client/context/WishlistContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sacred_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sacred_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        // Clear any active toasts or use distinct unique messages to prevent stacking bugs
        toast.info(`Removed ${product.title} from wishlist`, { toastId: `wishlist-${product.id}` });
        return prev.filter(item => item.id !== product.id);
      } else {
        toast.success(`Added ${product.title} to wishlist`, { toastId: `wishlist-${product.id}` });
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);