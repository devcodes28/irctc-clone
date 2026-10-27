import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';

/**
 * Signup Page Component (Replicating signup.html)
 * Demonstrates:
 * - Form validation with derived error state (PPT Slide 86-88)
 * - Multiple controlled inputs and inline validation feedback (PPT Slide 35-38)
 * - Async registration API call and redirect on success
 */
function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.fullName.trim().length < 2) newErrors.fullName = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Please enter a valid email address.';
    if (!/^[0-9]{10}$/.test(formData.mobile.trim())) newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (formData.confirmPassword !== formData.password || formData.confirmPassword === '') {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await api.registerUser({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        password: formData.password
      });

      if (result && result.success) {
        alert('Registration successful! Please log in with your credentials.');
        navigate('/login');
      } else {
        alert(result?.message || 'Registration failed.');
      }
    } catch (err) {
      alert("Server connection failed. Is your backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue`;

  return (
    <div className="text-gray-800 font-sans min-h-screen flex flex-col bg-gray-50 m-0 relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-8 py-6 grow flex items-center justify-center">
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
              <span className="text-irctc-orange text-xs font-bold tracking-widest uppercase">New here?</span>
              <h1 className="text-3xl font-bold mt-2 mb-3 leading-snug">
                Join and start booking in minutes.
              </h1>
              <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
                Create your account to book tickets, track PNR status, and manage your journeys from one dashboard.
              </p>

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

              <div className="flex items-center justify-between pb-3">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Boarding pass</p>
                  <p className="text-xl font-bold text-irctc-blue">Register</p>
                </div>
                <span className="text-[10px] font-bold text-irctc-orange border border-irctc-orange/40 bg-orange-50 px-2.5 py-1 rounded-full">
                  NEW USER
                </span>
              </div>

              <div className="relative my-2">
                <div className="border-t-2 border-dashed border-gray-200"></div>
                <span className="absolute -left-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-50"></span>
                <span className="absolute -right-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-50"></span>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-4">Fill in your details to create your account.</p>

                <form onSubmit={handleSubmit} noValidate className="space-y-3">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={inputClass('fullName')}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={inputClass('email')}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 011 .76l1.12 4.5a1 1 0 01-.29 1L8.4 10.6a11 11 0 005 5l1.35-1.7a1 1 0 011-.29l4.5 1.12a1 1 0 01.76 1V19a2 2 0 01-2 2h-1C9.4 21 3 14.6 3 6V5z" />
                        </svg>
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={inputClass('mobile')}
                      />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  {/* Password */}
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 6 characters"
                        className={inputClass('password') + ' pr-9'}
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
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                        className={inputClass('confirmPassword') + ' pr-9'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-irctc-blue cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-sm mt-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-irctc-blue font-bold hover:underline">
                    Sign in
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

export default Signup;
