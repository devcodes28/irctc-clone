import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';

/**
 * Profile Page Component (Replicating profile.html)
 * Features:
 * - Real-time synchronization with MongoDB Atlas
 * - Full Name, Date of Birth, Email, and Mobile editable inputs
 * - Live E-Wallet balance display
 * - Safe numeric parsing and date formatting
 */
function Profile() {
  const navigate = useNavigate();
  const { user, currentUser, userId, updateProfileState, refreshUser } = useAuth();
  const activeUser = currentUser || user;

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    mobile: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Initial auth check & profile loading
  useEffect(() => {
    const storedId = localStorage.getItem('current_user_id');
    const storedUser = localStorage.getItem('current_user');

    if (!activeUser && !storedId && !storedUser) {
      alert('Please login to access your profile.');
      navigate('/login');
      return;
    }

    const effectiveId = activeUser?._id || activeUser?.id || userId || storedId;

    async function fetchFreshProfile() {
      try {
        if (effectiveId) {
          const res = await api.getUserProfile(effectiveId);
          if (res && res.success && res.user) {
            const u = res.user;
            let dobFormatted = '';
            if (u.dob) {
              try {
                dobFormatted = typeof u.dob === 'string' ? u.dob.split('T')[0] : new Date(u.dob).toISOString().split('T')[0];
              } catch (e) {
                dobFormatted = '';
              }
            }
            setFormData({
              fullName: u.fullName || '',
              dob: dobFormatted,
              email: u.email || '',
              mobile: u.mobile || ''
            });
            if (updateProfileState) updateProfileState(u);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching fresh profile from DB:", err);
      }

      // Fallback to currently available auth state or localStorage
      let fallbackUser = activeUser;
      if (!fallbackUser && storedUser) {
        try { fallbackUser = JSON.parse(storedUser); } catch (e) {}
      }

      if (fallbackUser) {
        let dobFormatted = '';
        if (fallbackUser.dob) {
          try {
            dobFormatted = typeof fallbackUser.dob === 'string' ? fallbackUser.dob.split('T')[0] : '';
          } catch (e) {}
        }
        setFormData({
          fullName: fallbackUser.fullName || fallbackUser.name || '',
          dob: dobFormatted,
          email: fallbackUser.email || '',
          mobile: fallbackUser.mobile || fallbackUser.phone || ''
        });
      }
      setLoading(false);
    }

    fetchFreshProfile();
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const effectiveId = activeUser?._id || activeUser?.id || userId || localStorage.getItem('current_user_id');
    if (!effectiveId) {
      alert("Unable to detect active user ID. Please log in again.");
      navigate('/login');
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await api.updateProfile(effectiveId, formData);
      if (res && res.success) {
        const updated = res.user || formData;
        if (updateProfileState) updateProfileState(updated);
        if (refreshUser) refreshUser();
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: res?.message || 'Failed to update profile.' });
      }
    } catch (err) {
      console.error("Profile submit error:", err);
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  }

  // Compute initials for avatar
  const displayName = formData.fullName || activeUser?.fullName || 'User';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  const rawBalance = activeUser?.walletBalance ?? 5000.00;
  const numericBalance = Number(isNaN(rawBalance) ? 5000 : rawBalance);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="grow flex items-center justify-center p-8">
          <p className="text-irctc-blue font-semibold">Loading profile from database...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
        <div className="max-w-225 mx-auto">
          
          {/* Profile Header Banner */}
          <div
            style={{ background: 'linear-gradient(to right, #213d77, #1e40af)' }}
            className="rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-irctc-orange flex items-center justify-center text-3xl font-black shadow-md border-2 border-white/20 shrink-0">
                {initials}
              </div>
              <div>
                <span className="text-irctc-orange text-xs font-bold tracking-widest uppercase">
                  Passenger Account
                </span>
                <h1 className="text-2xl md:text-3xl font-black mt-1">
                  {displayName}
                </h1>
                <p className="text-blue-200 text-sm mt-0.5">{formData.email || activeUser?.email}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-6 py-4 text-center md:text-right shrink-0 w-full md:w-auto">
              <p className="text-xs text-blue-200 uppercase tracking-wide font-semibold">E-Wallet Balance</p>
              <p className="text-2xl font-black text-white mt-1">
                ₹{numericBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Profile Form Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-10">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-irctc-blue">Personal Details</h2>
              <p className="text-xs text-gray-500 mt-1">
                Keep your profile details up-to-date for smooth bookings and notifications.
              </p>
            </div>

            {message.text && (
              <div
                className={`mb-6 p-4 rounded-xl text-sm font-semibold border ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter registered email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-end border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Back to Dashboard
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-8 py-2.5 bg-irctc-orange hover:bg-orange-600 text-white rounded-lg text-sm font-bold shadow-md transition disabled:opacity-60 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
