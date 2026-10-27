import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

/**
 * Alerts Page Component (Replicating alerts.html)
 * Demonstrates:
 * - Dynamic color styling & conditional rendering based on alert severity (PPT Slide 24 & 61)
 * - Fetching alerts from backend API using useEffect (PPT Slide 66-68)
 */
function Alerts() {
  const { currentUser, userId } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !userId) {
      setLoading(false);
      return;
    }

    async function loadAlerts() {
      try {
        setLoading(true);
        const data = await api.getUserAlerts(userId);
        setAlerts(data || []);
      } catch (err) {
        console.error("Failed to load alerts:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, [currentUser, userId]);

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
        <div className="max-w-300 mx-auto space-y-6">
          
          <div className="bg-white p-6 shadow-md rounded-2xl border-t-4 border-irctc-blue">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-irctc-blue">System & Account Alerts</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Stay updated with your latest transactions, booking statuses, and IRCTC advisories.
                </p>
              </div>
            </div>

            {/* Alert List */}
            <div className="space-y-4">
              {!currentUser ? (
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center text-yellow-800 text-sm">
                  Please{' '}
                  <Link to="/login" className="font-bold underline text-irctc-orange">
                    login
                  </Link>{' '}
                  to view your account alerts.
                </div>
              ) : loading ? (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500 text-sm">
                  Loading alerts from database...
                </div>
              ) : alerts.length === 0 ? (
                <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500 text-sm">
                  No new alerts found at this time.
                </div>
              ) : (
                alerts.map((alert, index) => {
                  let borderColor = 'border-blue-200 bg-blue-50 text-blue-900';
                  let iconColor = 'text-irctc-blue';

                  if (alert.type === 'success') {
                    borderColor = 'border-green-200 bg-green-50 text-green-900';
                    iconColor = 'text-green-600';
                  } else if (alert.type === 'warning') {
                    borderColor = 'border-orange-200 bg-orange-50 text-orange-900';
                    iconColor = 'text-irctc-orange';
                  } else if (alert.type === 'critical') {
                    borderColor = 'border-red-200 bg-red-50 text-red-900';
                    iconColor = 'text-red-600';
                  }

                  const dateStr = alert.createdAt
                    ? new Date(alert.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })
                    : 'Just now';

                  const alertTitle =
                    alert.title ||
                    (alert.type ? `${alert.type.toUpperCase()} Advisory` : 'IRCTC Notification');

                  return (
                    <div
                      key={alert._id || index}
                      className={`p-4 border ${borderColor} rounded-xl shadow-sm flex items-start space-x-4 transition`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm ${iconColor}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                      <div className="grow">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-base">{alertTitle}</h4>
                          <span className="text-[11px] opacity-75">{dateStr}</span>
                        </div>
                        <p className="text-xs leading-relaxed opacity-90">{alert.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Alerts;
