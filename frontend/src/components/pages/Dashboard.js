import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

/**
 * Dashboard Page Component (Replicating dashboard.html)
 * Features:
 * - Dynamic Welcome Banner with user name & wallet balance
 * - Navigation tiles to core IRCTC services
 * - Live Upcoming Journey card from database
 */
function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, userId, walletBalance, refreshUser } = useAuth();

  const [recentBooking, setRecentBooking] = useState(null);
  const [trainInfo, setTrainInfo] = useState(null);

  // Auth guard — only runs when login state changes
  useEffect(() => {
    if (!currentUser) {
      alert('Please login to access your dashboard.');
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Refresh wallet balance once on mount
  useEffect(() => {
    if (userId) refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Load recent journey once on mount
  useEffect(() => {
    if (!userId) return;
    async function loadRecentJourney() {
      try {
        const bookings = await api.getUserBookings(userId);
        if (bookings && bookings.length > 0) {
          const active = bookings.filter((b) => b.bookingStatus !== 'Cancelled');
          if (active.length > 0) {
            const first = active[0];
            setRecentBooking(first);
            const t = await api.getTrainDetails(first.trainNumber);
            setTrainInfo(t);
          }
        }
      } catch (err) {
        console.error("Error loading dashboard journey:", err);
      }
    }
    loadRecentJourney();
  }, [userId]);

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col overflow-x-hidden relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-6 py-6 md:py-10 grow">
        <div className="max-w-300 w-full mx-auto">
          
          {/* HERO SECTION */}
          <div style={{background:'linear-gradient(to right, #213d77, #1e40af)'}} className="relative overflow-hidden w-full min-h-auto md:min-h-69.5 px-5 md:px-10 py-8 md:py-11 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-10 rounded-2xl text-white shadow-xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [bg-size:16px_16px]"></div>
            
            <div className="relative z-10 flex-1 text-left min-w-0">
              <span className="text-irctc-orange text-xs font-bold tracking-widest uppercase">
                Passenger Dashboard
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-1">
                Welcome back, {currentUser?.fullName || 'Traveler'}
              </h1>
              <p className="text-blue-100 text-sm mt-1 leading-relaxed max-w-full">
                Manage your train tickets, check live PNR status, and view wallet balance.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-57.5 shrink-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-5 py-3.5 text-right">
              <p className="text-xs text-blue-200">E-Wallet Balance</p>
              <p className="text-xl font-black text-white mt-1">
                ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* DASHBOARD TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7 my-7 w-full">
            
            <div
              onClick={() => navigate('/trains')}
              className="bg-white px-6 py-6 md:px-7.5 md:py-7 flex flex-col rounded-2xl shadow-sm border border-gray-200 hover:border-irctc-orange cursor-pointer transition group min-h-42.5 lg:h-46.5 w-full"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-irctc-orange flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Book a Train</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-full">
                Search routes and reserve seats instantly.
              </p>
            </div>

            <div
              onClick={() => navigate('/my-bookings')}
              className="bg-white px-6 py-6 md:px-7.5 md:py-7 flex flex-col rounded-2xl shadow-sm border border-gray-200 hover:border-irctc-blue cursor-pointer transition group min-h-42.5 lg:h-46.5 w-full"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-irctc-blue flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">My Bookings</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-full">
                View active tickets and travel history.
              </p>
            </div>

            <div
              onClick={() => navigate('/e-wallet')}
              className="bg-white px-6 py-6 md:px-7.5 md:py-7 flex flex-col rounded-2xl shadow-sm border border-gray-200 hover:border-irctc-orange cursor-pointer transition group min-h-42.5 lg:h-46.5 w-full"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-irctc-orange flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">E-Wallet</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-full">
                Top-up wallet and view statements.
              </p>
            </div>

            <div
              onClick={() => navigate('/profile')}
              className="bg-white px-6 py-6 md:px-7.5 md:py-7 flex flex-col rounded-2xl shadow-sm border border-gray-200 hover:border-irctc-orange cursor-pointer transition group min-h-42.5 lg:h-46.5 w-full"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-irctc-orange flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">My Profile</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-full">
                Manage your personal details and account settings.
              </p>
            </div>

          </div>

          {/* UPCOMING JOURNEY CARD */}
          {recentBooking && (
            <div className="w-full mb-7 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Upcoming Journey</h3>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  Confirmed
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded-xl border border-gray-100 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    {trainInfo ? `${trainInfo.trainNumber} - ${trainInfo.trainName}` : recentBooking.trainNumber}
                  </p>
                  <h4 className="text-base font-bold text-gray-900 mt-1">
                    {recentBooking.originName || recentBooking.originCode || trainInfo?.originName || 'Origin'} → {recentBooking.destinationName || recentBooking.destinationCode || trainInfo?.destinationName || 'Destination'}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Date: {recentBooking.travelDate} • Class: {recentBooking.classType || 'SL'} • PNR: {recentBooking.pnr}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/ticket?pnr=${recentBooking.pnr}`)}
                  className="bg-irctc-blue hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                >
                  View Ticket
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
