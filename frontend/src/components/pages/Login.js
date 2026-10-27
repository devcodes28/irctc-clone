import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';

/**
 * Login Page Component (Replicating login.html)
 * Demonstrates:
 * - Controlled form inputs with useState (PPT Slide 86-88)
 * - Form validation and error handling
 * - Context API login action (PPT Slide 77-78)
 * - useNavigate for programmatic routing (PPT Slide 82-85)
 */
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginId.trim().length < 3 || password.length < 6) {
      alert('Please enter valid login details.');
      return;
    }

    setLoading(true);

    try {
      const auth = await api.loginUser(loginId.trim(), password);

      if (auth && auth.success) {
        login(auth.user);

        if (auth.isAdmin || loginId.toLowerCase() === 'admin@irctc.co.in') {
          localStorage.setItem('is_admin', 'true');
          navigate('/admin-dashboard');
          return;
        }

        if (localStorage.getItem('redirect_to_booking') === 'true') {
          localStorage.removeItem('redirect_to_booking');
          navigate('/booking');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(auth?.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      alert("Server connection failed. Is your backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 font-sans relative min-h-screen bg-gray-50 flex flex-col justify-between">
      <TrainAnimation />
      <Navbar />

      <main className="w-full grow flex items-center justify-center px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-275 w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">

          {/* Left Blue Panel */}
          <div className="hidden lg:flex lg:w-2/5 bg-irctc-blue flex-col justify-between p-10 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                IRCTC <span className="text-irctc-orange">RailConnect</span>
              </span>
            </div>

            <div>
              <span className="text-irctc-orange text-xs font-bold tracking-widest uppercase">
                Ready for your next journey?
              </span>
              <h1 className="text-3xl font-bold mt-2 mb-3 leading-snug">Your journey, sorted.</h1>
              <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
                Sign in to pick up where you left off and keep track of your upcoming trips securely.
              </p>

              {/* Animated Track */}
              <div className="mt-8">
                <div className="relative h-px bg-white/25">
                  <span className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-irctc-orange"></span>
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/60"></span>
                  <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-irctc-orange"></span>
                  <div className="track-train-animation absolute -top-2 left-0">
                    <svg className="w-4 h-4 text-irctc-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15V6a2 2 0 012-2h12a2 2 0 012 2v9a4 4 0 01-4 4H8a4 4 0 01-4-4z" />
                      <path d="M4 11h16" />
                      <circle cx="8.5" cy="17.5" r=".6" fill="currentColor" />
                      <circle cx="15.5" cy="17.5" r=".6" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] tracking-widest text-blue-100/60 uppercase mt-2">
                  <span>Origin</span>
                  <span>En route</span>
                  <span>Destination</span>
                </div>
              </div>
            </div>

            <p className="text-blue-100/50 text-xs">From booking to boarding, we've got you covered.</p>
          </div>

          {/* Right Form Panel */}
          <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-sm bg-white rounded-2xl relative">

              <div className="flex items-center justify-between pb-4">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Boarding pass · Auth</p>
                  <p className="text-xl font-bold text-irctc-blue">Sign In</p>
                </div>
                <span className="text-[10px] font-bold text-irctc-orange border border-irctc-orange/40 bg-orange-50 px-2.5 py-1 rounded-full">
                  WELCOME ABOARD
                </span>
              </div>

              <div className="relative my-2">
                <div className="border-t-2 border-dashed border-gray-200"></div>
                <span className="absolute -left-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-50"></span>
                <span className="absolute -right-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-50"></span>
              </div>

              <div className="pt-4">
                <p className="text-xs text-gray-500 mb-5">
                  Enter your credentials to access your bookings and dashboard.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email or mobile number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        placeholder="you@example.com or 9XXXXXXXXX"
                        required
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-irctc-blue cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                      <input type="checkbox" className="accent-irctc-blue w-4 h-4 rounded" />
                      Keep me signed in
                    </label>
                    <Link to="/forgot-password" className="text-irctc-blue font-semibold hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Signing In...' : 'Sign In & Board'}
                  </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-5">
                  New to IRCTC?{' '}
                  <Link to="/signup" className="text-irctc-blue font-bold hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
