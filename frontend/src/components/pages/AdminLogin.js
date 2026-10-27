import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';

/**
 * AdminLogin Page Component
 * Demonstrates:
 * - Controlled form inputs with useState (PPT Slide 86-88)
 * - Two-panel split layout matching the official IRCTC portal theme
 * - Local authentication with admin credentials
 * - Programmatic routing with useNavigate (PPT Slide 82-85)
 */
function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const { username, password } = credentials;
      if (
        (username === 'admin' || username === 'admin@irctc.co.in') &&
        password === 'admin123'
      ) {
        localStorage.setItem('irctc_admin_auth', 'true');
        localStorage.setItem('is_admin', 'true');
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin credentials. Please check your username and password.');
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="text-gray-800 font-sans min-h-screen flex flex-col justify-between bg-gray-50 relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full grow flex items-center justify-center px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-275 w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">

          {/* Left IRCTC Blue Panel */}
          <div className="hidden lg:flex lg:w-2/5 bg-irctc-blue flex-col justify-between p-10 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                IRCTC <span className="text-irctc-orange">Admin</span>
              </span>
            </div>

            <div>
              <span className="text-irctc-orange text-xs font-bold tracking-widest uppercase">
                Operations & Management
              </span>
              <h1 className="text-3xl font-extrabold mt-2 mb-3 leading-snug">
                Railway Fleet Control Portal
              </h1>
              <p className="text-blue-100/90 text-sm leading-relaxed max-w-sm">
                Secure gateway for authorized railway administrators to manage schedules, track reservations, and broadcast travel advisories.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-xs text-blue-100">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span>Live passenger manifest oversight</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-blue-100">
                  <span className="w-2 h-2 rounded-full bg-irctc-orange"></span>
                  <span>Instant train schedule & fare management</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-blue-100">
                  <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                  <span>System-wide emergency alert broadcasts</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-blue-200/80">
              Centre for Railway Information Systems (CRIS)
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="w-full lg:w-3/5 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-irctc-blue border border-blue-200">
                   Restricted Access
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-irctc-blue mb-1">
                Admin Sign In
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Enter your administrative credentials to manage IRCTC operations.
              </p>

              {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Admin Username or Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                      placeholder="admin or admin@irctc.co.in"
                      className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
                  <span className="font-bold text-irctc-blue">Default credentials:</span> username <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono text-gray-800">admin</code> & password <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono text-gray-800">admin123</code>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition disabled:opacity-60 cursor-pointer text-sm"
                >
                  {loading ? 'Authenticating...' : 'Sign In as Administrator'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-irctc-blue hover:underline font-bold cursor-pointer"
                >
                  ← Return to Passenger Portal
                </button>
                <span>Authorized Staff Only</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminLogin;
