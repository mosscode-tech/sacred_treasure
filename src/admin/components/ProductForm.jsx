// src/admin/components/ProductForm.jsx
import { useState, useEffect } from 'react';

const ProductForm = ({ initialData, existingProducts, onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Extract unique categories dynamically from existing products in Firestore
  const dynamicCategories = Array.from(
    new Set(existingProducts.map(p => p.category).filter(Boolean))
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPrice(initialData.price || '');
      setStock(initialData.stock || '');
      setImageFile(null); // Reset file input on edit select
      
      const prodCat = initialData.category || '';
      if (prodCat && !dynamicCategories.includes(prodCat)) {
        setIsCustomCategory(true);
        setCustomCategory(prodCat);
      } else {
        setCategory(prodCat || (dynamicCategories[0] || ''));
        setIsCustomCategory(false);
      }
    } else {
      // Clear form when initialData is null (Fresh create or post-submit reset)
      setTitle('');
      setDescription('');
      setPrice('');
      setStock('');
      setImageFile(null);
      setIsCustomCategory(false);
      if (dynamicCategories.length > 0) {
        setCategory(dynamicCategories[0]);
      } else {
        setCategory('');
      }
    }
  }, [initialData, existingProducts]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'ADD_NEW') {
      setIsCustomCategory(true);
      setCustomCategory('');
    } else {
      setIsCustomCategory(false);
      setCategory(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const finalCategory = isCustomCategory ? customCategory.trim() : category;
    
    onSubmit({
      title,
      description,
      price: Number(price),
      category: finalCategory,
      stock: Number(stock),
      imageFile: imageFile instanceof File ? imageFile : null
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">
        {initialData ? 'Edit Product' : 'Add New Product'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Product Title</label>
          <input 
            type="text" 
            placeholder="e.g. Sacred Artifact" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
          {!isCustomCategory ? (
            <div className="flex gap-2">
              <select 
                value={category} 
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {dynamicCategories.length === 0 && <option value="">No categories yet (Add custom)</option>}
                {dynamicCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="ADD_NEW">+ Add Custom Category...</option>
              </select>
            </div>
          ) : (
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter new category" 
                value={customCategory} 
                onChange={(e) => setCustomCategory(e.target.value)} 
                required 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {dynamicCategories.length > 0 && (
                <button 
                  type="button" 
                  onClick={() => setIsCustomCategory(false)}
                  className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition"
                >
                  Back
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-600">Description (Markdown/Markup supported)</label>
          <span className="text-xs text-gray-400">Use **bold**, *italics*, or - lists</span>
        </div>
        <textarea 
          placeholder="Describe item details using markdown e.g. **Pure brass** artifact..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows="4"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Price ($)</label>
          <input 
            type="number" 
            placeholder="0.00" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Stock Quantity</label>
          <input 
            type="number" 
            placeholder="e.g. 10" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Product Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])} 
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="flex gap-4 pt-2">
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Product' : 'Upload Product'}
        </button>
        {initialData && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;