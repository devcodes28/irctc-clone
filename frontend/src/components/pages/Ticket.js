import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';

/**
 * Ticket Page Component (Replicating ticket.html)
 * Features:
 * - Electronic Reservation Slip (ERS) layout
 * - Dynamic QR Code generation
 * - Print stylesheet support
 * - Reads PNR from query string using useSearchParams()
 */
function Ticket() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pnr = searchParams.get('pnr');

  const [booking, setBooking] = useState(null);
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pnr) {
      setError("No PNR provided in request.");
      setLoading(false);
      return;
    }

    async function loadTicketData() {
      try {
        setLoading(true);
        const b = await api.getBookingByPNR(pnr);
        if (!b) {
          setError(`No booking found for PNR: ${pnr}`);
          setLoading(false);
          return;
        }
        setBooking(b);

        const t = await api.getTrainDetails(b.trainNumber);
        setTrain(t);
      } catch (err) {
        console.error("Error fetching ticket:", err);
        setError("Failed to load ticket details.");
      } finally {
        setLoading(false);
      }
    }

    loadTicketData();
  }, [pnr]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 items-center justify-center">
        <p className="text-gray-500 font-semibold">Generating Electronic Reservation Slip (ERS)...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md">
          <p className="text-red-500 font-bold mb-4">{error || "Unable to display ticket."}</p>
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-irctc-blue text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    );
  }

  const isCancelled = booking.bookingStatus === 'Cancelled';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=IRCTC-PNR-${booking.pnr}`;

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col overflow-x-hidden relative">
      <TrainAnimation />

      {/* HEADER (no-print) */}
      <header className="w-full relative z-20 px-4 md:px-6 pt-4 md:pt-8 shrink-0 no-print">
        <div className="max-w-300 w-full mx-auto bg-white rounded-lg shadow-sm">
          <nav className="flex items-center justify-between p-4 mb-0">
            <Link to="/" className="flex items-center cursor-pointer no-underline">
              <span className="text-3xl font-bold text-irctc-blue">IRCTC</span>
            </Link>
            
            <div className="hidden md:flex space-x-6 items-center">
              <Link to="/dashboard" className="text-gray-700 hover:text-irctc-orange font-semibold transition-colors">
                Dashboard
              </Link>
              <Link to="/my-bookings" className="text-irctc-orange font-bold border-b-2 border-irctc-orange pb-1 transition-colors">
                My Bookings
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="border-2 border-irctc-blue text-irctc-blue hover:bg-blue-50 font-bold py-2 px-4 rounded transition-colors text-sm cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="w-full relative z-10 px-4 md:px-6 py-6 md:py-10 grow flex justify-center">
        <div className="max-w-212.5 w-full">
          
          {/* ACTION BUTTONS (no-print) */}
          <div className="flex justify-end gap-3 mb-4 no-print">
            <button
              onClick={handlePrint}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print ERS
            </button>
          </div>

          {/* THE TICKET */}
          <div className="ticket-container bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 p-8 md:p-10 relative overflow-hidden">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <span className="text-9xl font-black text-irctc-blue tracking-tighter transform -rotate-45">
                IRCTC
              </span>
            </div>

            {/* Ticket Header */}
            <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6 relative z-10">
              <div>
                <h1 className="text-3xl font-black text-irctc-blue tracking-tight">IRCTC</h1>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                  Electronic Reservation Slip (ERS)
                </p>
                <div
                  className={`mt-3 inline-block px-3 py-1 text-xs font-black uppercase tracking-wide rounded-sm border ${
                    isCancelled
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : 'bg-green-100 text-green-800 border-green-300'
                  }`}
                >
                  {booking.bookingStatus || 'CONFIRMED'}
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="w-24 h-24 bg-white border border-gray-300 p-1 rounded inline-block">
                  <img src={qrUrl} alt="Ticket QR Code" className="w-full h-full object-contain" />
                </div>
                <p className="text-[10px] text-gray-500 mt-1 font-semibold">Scan to Verify</p>
              </div>
            </div>

            {/* Primary Journey Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 relative z-10">
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">PNR No.</p>
                <p className="text-lg font-black text-gray-900">{booking.pnr}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">Train No. & Name</p>
                <p className="text-sm font-bold text-gray-900 uppercase">
                  {booking.trainNumber} - {booking.trainName || train?.trainName || 'Express'}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">Date of Journey</p>
                <p className="text-sm font-bold text-gray-900">{booking.travelDate}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">Class</p>
                <p className="text-sm font-bold text-gray-900">{booking.classType || 'SL'}</p>
              </div>
            </div>

            {/* Route Details Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left w-full md:w-auto">
                <p className="text-[11px] text-blue-600 uppercase tracking-wide font-bold">From</p>
                <p className="text-3xl font-black text-irctc-blue my-1">
                  {booking.originCode || train?.originCode || 'SRC'}
                </p>
                <p className="text-xs text-gray-600 font-semibold uppercase">
                  {booking.originName || train?.originName || 'Origin Station'}
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {train ? train.departureTime : '06:00 AM'}
                </p>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
                <div className="w-full flex items-center">
                  <div className="h-0.5 w-full bg-blue-200"></div>
                  <svg className="w-6 h-6 text-blue-400 mx-2 shrink-0 transform rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="h-0.5 w-full bg-blue-200"></div>
                </div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-2 bg-blue-50 px-2">
                  Boarding
                </span>
              </div>

              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-[11px] text-blue-600 uppercase tracking-wide font-bold">To</p>
                <p className="text-3xl font-black text-irctc-blue my-1">
                  {booking.destinationCode || train?.destinationCode || 'DEST'}
                </p>
                <p className="text-xs text-gray-600 font-semibold uppercase">
                  {booking.destinationName || train?.destinationName || 'Destination Station'}
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {train ? train.arrivalTime : '08:00 PM'}
                </p>
              </div>
            </div>

            {/* Passenger Details Table */}
            <div className="mb-8 relative z-10">
              <h3 className="font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4 text-sm uppercase tracking-wide">
                Passenger Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold">#</th>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Age</th>
                      <th className="px-4 py-3 font-semibold">Gender</th>
                      <th className="px-4 py-3 font-semibold">Booking Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Coach / Seat / Berth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(booking.passengers || []).map((p, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                        <td className="px-4 py-3 font-bold text-gray-900">{p.name}</td>
                        <td className="px-4 py-3 text-gray-600">{p.age}</td>
                        <td className="px-4 py-3 text-gray-600">{p.gender}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`font-semibold ${
                              isCancelled || p.status === 'CAN' ? 'text-red-600' : 'text-green-700'
                            }`}
                          >
                            {isCancelled ? 'CANCELLED' : p.status || 'CNF'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">
                          {p.coach || 'S1'} / {p.berth || `${idx * 8 + 12} (Lower)`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fare Summary & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-gray-200 relative z-10">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Payment Mode</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{booking.paymentMode || 'IRCTC E-Wallet'}</p>
                <p className="text-[11px] text-gray-400 mt-1">Transaction Ref: IRCTC-TXN-{booking.pnr}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Fare Paid</p>
                <p className="text-2xl font-black text-irctc-orange mt-0.5">
                  ₹{(booking.fareDetails?.totalFare || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-8 pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center leading-relaxed">
              This is a computer-generated Electronic Reservation Slip and does not require physical signature. 
              Please carry an original government-issued photo identity card during the journey.
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Ticket;
