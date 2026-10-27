import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

/**
 * Holidays Page Component (Replicating holidays.html)
 * Demonstrates:
 * - Modal state management with useState (PPT Slide 35 & 56-62)
 * - Props passing into booking form
 * - Dynamic pricing calculations
 */
function Holidays() {
  const navigate = useNavigate();
  const { currentUser, userId, walletBalance, refreshUser } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    travelers: 1,
    name: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);

  const packages = [
    {
      id: 'HOLIDAY001',
      label: 'Golden Temple',
      title: 'Delhi - Amritsar - Jaipur',
      desc: 'Experience the rich heritage of India with this classic 5-day tour covering the iconic Golden Temple.',
      price: 14500,
      image: '/images/Golden Temple.jpg'
    },
    {
      id: 'HOLIDAY002',
      label: 'Spiritual Journey',
      title: 'South India Temple Tour',
      desc: 'A divine 7-day journey through the magnificent temples of Madurai, Rameswaram, and Kanyakumari.',
      price: 18200,
      image: '/images/Vaishno Devi.jpg'
    },
    {
      id: 'HOLIDAY003',
      label: 'Nature Retreat',
      title: 'Kerala Backwaters',
      desc: 'Relax in the serene backwaters of Alleppey and Munnar tea gardens on this peaceful 4-day getaway.',
      price: 12800,
      image: '/images/kerala backwaters.jpg'
    }
  ];

  const openBookingModal = (pkg) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
    setFormData({ date: '', travelers: 1, name: '', contact: '' });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPackage(null);
  };

  const totalCost = selectedPackage ? selectedPackage.price * (parseInt(formData.travelers) || 1) : 0;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookHoliday = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login to book a holiday package.");
      navigate('/login');
      return;
    }

    if (walletBalance < totalCost) {
      alert(`Insufficient E-Wallet balance (₹${walletBalance.toFixed(2)}). Total cost is ₹${totalCost.toFixed(2)}. Please top-up your wallet first.`);
      return;
    }

    setLoading(true);
    try {
      const bookingPayload = {
        userId,
        trainNumber: selectedPackage.id,
        trainName: selectedPackage.title,
        originCode: 'SRC',
        originName: 'Tour Starting Point',
        destinationCode: 'DST',
        destinationName: selectedPackage.title,
        travelDate: formData.date,
        classType: 'PKG',
        passengers: [{ name: formData.name, age: 30, gender: 'Male', coach: 'TUR', berth: 'Holiday', status: 'CNF' }],
        fareDetails: { baseFare: selectedPackage.price, totalFare: totalCost },
        paymentMode: 'E-Wallet',
        bookingStatus: 'Confirmed'
      };

      const result = await api.saveBooking(bookingPayload);
      if (result && result.success) {
        await refreshUser();
        alert(`🎉 Holiday package "${selectedPackage.title}" booked successfully!\nPNR: ${result.booking.pnr}`);
        closeModal();
        navigate(`/ticket?pnr=${result.booking.pnr}`);
      } else {
        alert(result?.message || "Booking failed.");
      }
    } catch (err) {
      console.error("Holiday booking error:", err);
      alert("Network error while booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col overflow-x-hidden relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-6 py-6 md:py-10 grow">
        <div className="max-w-300 w-full mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-irctc-blue mb-3">Discover Incredible India</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated tour packages, from spiritual journeys to luxury train experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                <div
                  className="h-48 bg-gray-200 bg-cover bg-center"
                  style={{ backgroundImage: `url('${pkg.image}')` }}
                ></div>
                <div className="p-6">
                  <div className="text-xs font-bold text-irctc-orange uppercase tracking-wide mb-2">
                    {pkg.label}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{pkg.desc}</p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Starting from</p>
                      <p className="text-lg font-black text-irctc-blue">₹{pkg.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button
                      onClick={() => openBookingModal(pkg)}
                      className="bg-irctc-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* BOOKING MODAL */}
      {modalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex bg-gray-900/60 backdrop-blur-sm items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-irctc-blue p-5 flex justify-between items-center text-white shrink-0">
              <h2 className="text-xl font-bold">Book Holiday Package</h2>
              <button onClick={closeModal} className="text-blue-200 hover:text-white transition cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="mb-4 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-black text-gray-900 uppercase">{selectedPackage.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Base Price: <span className="font-bold text-irctc-blue">₹{selectedPackage.price.toLocaleString('en-IN')}</span> per person
                </p>
              </div>

              <form onSubmit={handleBookHoliday} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-600 mb-1">Travel Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      required
                      className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-600 mb-1">No. of Travelers</label>
                    <input
                      type="number"
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleFormChange}
                      min="1"
                      max="10"
                      required
                      className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-600 mb-1">Lead Passenger Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Full name"
                    className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-600 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleFormChange}
                    required
                    placeholder="10-digit mobile"
                    className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-700">Total Package Cost</p>
                  <p className="text-2xl font-black text-irctc-blue">₹{totalCost.toLocaleString('en-IN')}</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition mt-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Booking...' : 'Confirm & Pay via E-Wallet'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Holidays;
