// src/client/context/ProductContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items);

        const uniqueCategories = ['All', ...new Set(items.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products cache:", err);
      } finally {
        setLoading(false);
      }
    }

    // Fetch only if we don't have products cached yet
    if (products.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);