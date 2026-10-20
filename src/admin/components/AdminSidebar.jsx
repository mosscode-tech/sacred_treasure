// src/admin/components/AdminSidebar.jsx
import { FiPackage, FiUsers, FiEye, FiGrid, FiLogOut, FiX } from 'react-icons/fi';

export default function AdminSidebar({ activeTab, setActiveTab, counts, isSidebarOpen, setIsSidebarOpen, handleLogout }) {
  return (
    <aside className={`
      fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 shrink-0
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-6 hidden md:block border-b border-gray-100">
        <h2 className="text-xl font-extrabold text-gray-900">Admin Portal</h2>
        <p className="text-xs text-gray-400 mt-0.5">Sacred Treasure Storefront</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <button 
          onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition cursor-pointer ${
            activeTab === 'orders' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <FiPackage className="text-lg" /> Orders
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 font-bold">{counts.orders}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition cursor-pointer ${
            activeTab === 'users' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <FiUsers className="text-lg" /> Users
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 font-bold">{counts.users}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('visitors'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition cursor-pointer ${
            activeTab === 'visitors' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <FiEye className="text-lg" /> Visitors Log
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 font-bold">{counts.visitors}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition cursor-pointer ${
            activeTab === 'products' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <FiGrid className="text-lg" /> Products
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 font-bold">{counts.products}</span>
        </button>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm rounded-xl transition cursor-pointer"
        >
          <FiLogOut /> Sign Out
        </button>
      </div>
    </aside>
  );
}