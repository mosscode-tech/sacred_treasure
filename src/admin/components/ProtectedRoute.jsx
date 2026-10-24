// src/admin/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ADMIN_EMAILS = ['mosscode101@gmail.com', 'josephinenungarivc@gmail.com'];

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/admin2026/login" replace />;
  }

  return children;
}