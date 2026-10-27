import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Spinner } from 'react-bootstrap';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

/**
 * MyBookings Page Component (Replicating my-bookings.html)
 * Demonstrates:
 * - Complex asynchronous data loading with useEffect and useCallback (PPT Slide 66-68)
 * - Conditional rendering for empty state and cancellation action (PPT Slide 56-62)
 * - State management and optimistic / synced updates with AuthContext (PPT Slide 77-78)
 */
function MyBookings() {
  const navigate = useNavigate();
  const { currentUser, userId, refreshUser } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [trainMap, setTrainMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await api.getUserBookings(userId);
      setBookings(data || []);

      // Pre-fetch train details for each unique train number
      const map = {};
      const uniqueTrainNums = [...new Set((data || []).map((b) => b.trainNumber))];
      await Promise.all(
        uniqueTrainNums.map(async (num) => {
          const t = await api.getTrainDetails(num);
          if (t) map[num] = t;
        })
      );
      setTrainMap(map);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!currentUser) {
      alert('Please login to view your bookings.');
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [currentUser, navigate, fetchBookings]);

  // Handle Cancellation
  const handleCancelTicket = async (pnr) => {
    if (
      window.confirm(
        `Are you sure you want to cancel ticket PNR: ${pnr}?\nThe refund will be credited instantly to your E-Wallet.`
      )
    ) {
      try {
        const result = await api.cancelBooking(pnr);
        if (result && result.success) {
          alert("Success! Ticket cancelled successfully.");
          await refreshUser();
          await fetchBookings();
        } else {
          alert(result?.message || "Cancellation failed.");
        }
      } catch (err) {
        console.error("Cancellation error:", err);
        alert("Failed to cancel ticket due to network error.");
      }
    }
  };

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
        <div className="max-w-250 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-irctc-blue">My Bookings</h2>
            <button
              onClick={() => navigate('/trains')}
              className="bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-xs transition cursor-pointer"
            >
              + Book New Ticket
            </button>
          </div>

          {loading && (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow border border-gray-200 d-flex flex-column align-items-center justify-content-center gap-2">
              <Spinner animation="border" variant="primary" />
              <span>Loading bookings from database...</span>
            </div>
          )}

          {!loading && bookings.length === 0 && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-10 text-center">
              <p className="text-gray-500 mb-4">You have no upcoming or past bookings.</p>
              <button
                onClick={() => navigate('/trains')}
                className="bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition shadow-sm cursor-pointer"
              >
                Book a Ticket
              </button>
            </div>
          )}

          {!loading && bookings.length > 0 && (
            <div className="space-y-6">
              {bookings.map((booking) => {
                const trainDetails = trainMap[booking.trainNumber];
                const isCancelled = booking.bookingStatus === 'Cancelled';
                const primaryPassenger = booking.passengers?.[0];
                const coachClass = primaryPassenger ? primaryPassenger.coach || 'S1' : 'S1';
                const totalFare = booking.fareDetails?.totalFare || 500;

                return (
                  <div
                    key={booking.pnr}
                    className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                  >
                    <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex justify-between items-center">
                      <div className="font-semibold text-gray-700 flex items-center gap-2">
                        <span>PNR: {booking.pnr}</span>
                        <button
                          onClick={() => navigate(`/ticket?pnr=${booking.pnr}`)}
                          className="text-xs text-irctc-blue hover:underline font-bold ml-2 cursor-pointer"
                        >
                          [View ERS]
                        </button>
                      </div>
                      {isCancelled ? (
                        <Badge bg="danger" className="px-3 py-1 text-sm font-bold rounded-pill">
                          CANCELLED
                        </Badge>
                      ) : (
                        <Badge bg="success" className="px-3 py-1 text-sm font-bold rounded-pill">
                          CONFIRMED
                        </Badge>
                      )}
                    </div>

                    <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="flex-1 w-full">
                        <h3 className="text-lg font-bold text-gray-900">
                          {trainDetails
                            ? `${trainDetails.trainNumber} / ${trainDetails.trainName}`
                            : `${booking.trainNumber} / Express Train`}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {booking.travelDate} • Class: {booking.classType || 'SL'} ({coachClass}) • Total Fare: ₹{totalFare.toFixed(2)}
                        </p>

                        <div className="mt-4 flex items-center space-x-4">
                          <div>
                            <p className="font-bold text-lg">
                              {booking.originCode || trainDetails?.originCode || 'SRC'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {trainDetails ? trainDetails.departureTime : '06:00 AM'}
                            </p>
                          </div>
                          <div className="text-gray-400 font-bold">⟶</div>
                          <div>
                            <p className="font-bold text-lg">
                              {booking.destinationCode || trainDetails?.destinationCode || 'DEST'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {trainDetails ? trainDetails.arrivalTime : '08:00 PM'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-3 w-full md:w-auto mt-4 md:mt-0">
                        {isCancelled ? (
                          <button
                            disabled
                            className="bg-gray-100 border border-gray-200 text-gray-400 px-6 py-2 rounded font-semibold cursor-not-allowed"
                          >
                            Ticket Cancelled
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCancelTicket(booking.pnr)}
                            className="border-2 border-red-500 text-red-500 hover:bg-red-50 px-6 py-2 rounded transition font-semibold cursor-pointer"
                          >
                            Cancel Ticket
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/ticket?pnr=${booking.pnr}`)}
                          className="bg-irctc-blue hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold transition text-sm cursor-pointer"
                        >
                          Print / View Ticket
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyBookings;
