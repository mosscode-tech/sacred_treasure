// src/admin/components/AdminOrders.jsx
import { FiPackage } from 'react-icons/fi';

export default function AdminOrders({ orders, onUpdateStatus }) {
  return (
    <div className="w-full min-w-0">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <FiPackage className="text-blue-600 shrink-0" /> Customer Orders Management
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-xs">
          <p className="text-gray-500">No orders placed in database yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-gray-400 block truncate">Order ID: {order.id}</span>
                  <p className="text-sm font-bold text-gray-800 mt-0.5 truncate">
                    Customer: {order.customer?.fullName} ({order.customer?.phone})
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Location: {order.customer?.town}, {order.customer?.county} | Courier: {order.customer?.courier}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select 
                    value={order.status || 'Pending'}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide border outline-none cursor-pointer ${
                      order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="py-4 divide-y divide-gray-50">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center text-sm gap-2">
                    <span className="text-gray-700 truncate">{item.title} (x{item.quantity})</span>
                    <span className="font-semibold text-gray-900 shrink-0">Ksh. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-lg text-blue-600">Ksh. {order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}