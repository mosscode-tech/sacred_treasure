// src/admin/pages/AdminProducts.jsx
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import ProductForm from '../components/ProductForm';
import { uploadImageToCloudinary } from '../../utils/uploadImage';
import { toast } from 'react-toastify';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const productsRef = collection(db, "products");

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(productsRef);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async ({ title, description, price, category, stock, imageFile }) => {
    setLoading(true);

    try {
      let imageUrl = editingProduct ? editingProduct.imageUrl : '';
      
      if (imageFile instanceof File) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const productData = {
        title,
        description,
        price,
        category,
        stock,
        imageUrl,
        updatedAt: new Date()
      };

      if (editingProduct) {
        const productDoc = doc(db, "products", editingProduct.id);
        await updateDoc(productDoc, productData);
        setEditingProduct(null);
        toast.success("Product updated successfully!");
      } else {
        productData.createdAt = new Date();
        await addDoc(productsRef, productData);
        setEditingProduct(null);
        toast.success("Product added successfully!");
      }

      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
        toast.success("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting product:", err);
        toast.error("Failed to delete product.");
      }
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="max-w-4xl mx-auto">
        {/* Modular Product Form */}
        <ProductForm 
          initialData={editingProduct}
          existingProducts={products}
          onSubmit={handleSaveProduct}
          onCancel={() => setEditingProduct(null)}
          loading={loading}
        />

        {/* Inventory List */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Inventory</h2>
        <div className="space-y-4">
          {products.map(p => (
            <div key={p.id} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 flex-shrink-0">No Img</div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800 truncate">{p.title}</h3>
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full shrink-0">{p.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1 font-mono">{p.description}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">Ksh.{p.price} <span className="text-gray-400 font-normal">| Stock: {p.stock}</span></p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto justify-end shrink-0">
                <button 
                  onClick={() => setEditingProduct(p)}
                  className="px-3 py-1.5 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition cursor-pointer"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500 text-center py-6 bg-white rounded-xl">No products found. Add your first item above!</p>
          )}
        </div>
      </div>
    </div>
  );
}