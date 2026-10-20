// src/admin/components/AdminVisitors.jsx
import { FiEye } from 'react-icons/fi';

export default function AdminVisitors({ visitors }) {
  return (
    <div className="w-full min-w-0">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <FiEye className="text-blue-600 shrink-0" /> Visitors & Database Logs ({visitors.length})
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                <th className="p-4">Log ID / Session</th>
                <th className="p-4">Action / Event</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">No telemetry logs recorded in database.</td>
                </tr>
              ) : (
                visitors.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-mono text-xs text-gray-500">{v.id}</td>
                    <td className="p-4 text-gray-800">{v.event || v.action || 'Storefront Visit'}</td>
                    <td className="p-4 text-gray-500 text-xs">
                      {v.createdAt?.toDate ? new Date(v.createdAt.toDate()).toLocaleString() : 'Recent'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}