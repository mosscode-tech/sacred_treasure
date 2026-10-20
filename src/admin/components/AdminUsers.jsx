// src/admin/components/AdminUsers.jsx
import { FiUsers } from 'react-icons/fi';

export default function AdminUsers({ users }) {
  return (
    <div className="w-full min-w-0">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <FiUsers className="text-blue-600 shrink-0" /> Registered Customers ({users.length})
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-sm whitespace-nowrap sm:whitespace-normal">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                <th className="p-4">User ID</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Account Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">No client documents found in Firestore "users" collection.</td>
                </tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-gray-500 font-mono text-xs truncate max-w-[150px]">{u.id}</td>
                    <td className="p-4 font-medium text-gray-800">{u.email}</td>
                    <td className="p-4 text-gray-600">Client Customer</td>
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