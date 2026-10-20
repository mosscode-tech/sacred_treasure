// src/client/pages/ClientAuth.jsx
import { useState } from 'react';
import { useClientAuth } from '../context/ClientAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

export default function ClientAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 1. Added loading state
  
  const { login } = useClientAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 2. Turn loading on
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false); // 3. Turn loading off when done
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 w-fit">
          <FiArrowLeft /> Back to Storefront
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your Account
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          (Optional) Save your preferences and speed up your checkout flow.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* 4. Updated button with spinner and disabled state */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/client/register" 
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}