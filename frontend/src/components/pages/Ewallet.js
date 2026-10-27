import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

/**
 * Ewallet Page Component (Replicating e-wallet.html)
 * Demonstrates:
 * - Controlled input & quick-action setters (PPT Slide 86-88)
 * - State management and database synchronization (PPT Slide 31-33 & 77)
 */
function Ewallet() {
  const navigate = useNavigate();
  const { currentUser, userId, walletBalance, refreshUser, updateWalletBalance } = useAuth();

  const [topupAmount, setTopupAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      alert('Please login to access your E-Wallet.');
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Refresh wallet balance once on mount
  useEffect(() => {
    if (userId) refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSetQuickAmount = (amount) => {
    setTopupAmount(amount.toString());
  };

  const handleTopup = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(topupAmount);

    if (isNaN(amountNum) || amountNum < 100) {
      alert("Please enter a valid amount of at least ₹100.");
      return;
    }

    setLoading(true);

    try {
      const newBal = walletBalance + amountNum;
      const res = await api.updateProfile(userId, { walletBalance: newBal });

      if (res && res.success) {
        updateWalletBalance(newBal);
        alert(`Successfully added ₹${amountNum.toFixed(2)} to your IRCTC E-Wallet!`);
        setTopupAmount('');
        await refreshUser();
      } else {
        alert(res?.message || "Failed to update wallet balance.");
      }
    } catch (err) {
      console.error("Topup error:", err);
      alert("Network error while processing wallet top-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
        <div className="max-w-200 mx-auto">
          
          <div className="bg-white p-8 shadow-md rounded-lg border-t-4 border-irctc-blue">
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-irctc-blue">IRCTC E-Wallet</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your funds for seamless ticket booking.</p>
              </div>
              <div className="mt-4 md:mt-0 text-center md:text-right bg-blue-50 px-6 py-4 rounded-lg border border-blue-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Available Balance</p>
                <p className="text-3xl font-black text-irctc-blue mt-1">
                  ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="max-w-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Top-up Wallet</h3>
              
              <form onSubmit={handleTopup} className="space-y-5">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-2 text-sm">Enter Amount (₹)</label>
                  <input
                    type="number"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    placeholder="e.g. 1000"
                    min="100"
                    required
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue font-bold text-lg"
                  />
                </div>

                {/* Quick Add Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleSetQuickAmount(500)}
                    className="flex-1 border border-gray-300 hover:border-irctc-orange hover:bg-orange-50 text-gray-700 font-semibold py-2 rounded-md transition text-sm cursor-pointer"
                  >
                    + ₹500
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickAmount(1000)}
                    className="flex-1 border border-gray-300 hover:border-irctc-orange hover:bg-orange-50 text-gray-700 font-semibold py-2 rounded-md transition text-sm cursor-pointer"
                  >
                    + ₹1000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickAmount(2000)}
                    className="flex-1 border border-gray-300 hover:border-irctc-orange hover:bg-orange-50 text-gray-700 font-semibold py-2 rounded-md transition text-sm cursor-pointer"
                  >
                    + ₹2000
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-sm transition-colors mt-4 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Processing Top-up...' : 'Proceed to Add Money'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Ewallet;
