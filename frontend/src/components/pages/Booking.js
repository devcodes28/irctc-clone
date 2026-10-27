import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CLASS_NAMES = {
  SL: 'Sleeper (SL)',
  '3A': 'AC 3 Tier (3A)',
  '2A': 'AC 2 Tier (2A)',
  '1A': 'AC First Class (1A)',
  PKG: 'Holiday Tour Package'
};

/**
 * Booking Page Component (Replicating booking.html)
 * Demonstrates:
 * - Dynamic form arrays with useState (PPT Slide 35 & 86)
 * - Lifting state up & derived calculations (PPT Slide 52-55)
 * - AuthContext consumption for seamless user experience (PPT Slide 77-78)
 * - Controlled inputs and form submission handling (PPT Slide 86-88)
 */
function Booking() {
  const navigate = useNavigate();
  const { currentUser, userId, walletBalance, refreshUser } = useAuth();

  const [train, setTrain] = useState(null);
  const [selectedClassObj, setSelectedClassObj] = useState(null);
  const [searchContext, setSearchContext] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamic passengers state
  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: 'Male', berth: 'No Preference' }
  ]);

  // Payment mode
  const [paymentMode, setPaymentMode] = useState('ewallet');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      alert("Please login to proceed with booking.");
      localStorage.setItem('redirect_to_booking', 'true');
      navigate('/login');
      return;
    }

    const savedSearch = localStorage.getItem('last_search');
    const trainNum = localStorage.getItem('selected_train_num') || localStorage.getItem('selected_train');
    const classType = localStorage.getItem('selected_class_type') || 'SL';

    if (!savedSearch || !trainNum) {
      navigate('/trains');
      return;
    }

    const parsedSearch = JSON.parse(savedSearch);
    setSearchContext(parsedSearch);

    async function fetchTrainInfo() {
      try {
        const t = await api.getTrainDetails(trainNum);
        if (t) {
          setTrain(t);
          const foundClass = t.availableClasses?.find((c) => c.classType === classType) || t.availableClasses?.[0];
          setSelectedClassObj(foundClass);
        }
      } catch (err) {
        console.error("Error loading train details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainInfo();
    refreshUser();
  }, [currentUser, navigate, refreshUser]);

  const handleSwitchClass = (newClassType) => {
    if (!train || !train.availableClasses) return;
    const found = train.availableClasses.find((c) => c.classType === newClassType);
    if (found) {
      setSelectedClassObj(found);
      localStorage.setItem('selected_class_type', found.classType);
    }
  };

  // Add passenger row
  const addPassenger = () => {
    if (passengers.length >= 6) {
      alert("A maximum of 6 passengers can be booked in a single reservation.");
      return;
    }
    setPassengers([...passengers, { name: '', age: '', gender: 'Male', berth: 'No Preference' }]);
  };

  // Remove passenger row
  const removePassenger = (index) => {
    if (passengers.length === 1) return;
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  // Handle passenger change
  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  // Total Fare calculation
  const baseFare = selectedClassObj ? selectedClassObj.baseFare : 0;
  const totalFare = baseFare * passengers.length;

  // Form submission
  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    if (passengers.length === 0) {
      alert("Please add at least one passenger.");
      return;
    }

    // Validate inputs
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name.trim() || !passengers[i].age) {
        alert(`Please complete the details for passenger ${i + 1}.`);
        return;
      }
    }

    if (paymentMode === 'ewallet' && walletBalance < totalFare) {
      alert(`Insufficient E-Wallet balance (₹${walletBalance.toFixed(2)}). Total fare is ₹${totalFare.toFixed(2)}. Please recharge your wallet or choose another payment mode.`);
      return;
    }

    setSubmitting(true);

    try {
      const modeString = paymentMode === 'ewallet' ? 'E-Wallet' : paymentMode === 'upi' ? 'UPI' : 'Card';

      const bookingPayload = {
        userId,
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        originCode: searchContext.sourceCode,
        originName: searchContext.sourceName,
        destinationCode: searchContext.destCode,
        destinationName: searchContext.destName,
        travelDate: searchContext.date,
        classType: selectedClassObj.classType,
        passengers: passengers.map((p, idx) => ({
          name: p.name.trim(),
          age: Number(p.age),
          gender: p.gender,
          berthPreference: p.berth,
          coach: `${selectedClassObj.classType === 'SL' ? 'S' : selectedClassObj.classType === '3A' ? 'B' : selectedClassObj.classType === '2A' ? 'A' : 'H'}${Math.floor(Math.random() * 5) + 1}`,
          berth: `${(idx * 8 + 12)} (${p.berth === 'No Preference' ? 'Lower' : p.berth})`,
          status: 'CNF'
        })),
        fareDetails: {
          baseFare: baseFare,
          totalFare: totalFare
        },
        paymentMode: modeString,
        bookingStatus: 'Confirmed'
      };

      const result = await api.saveBooking(bookingPayload);

      if (result && result.success && result.booking) {
        await refreshUser();
        navigate(`/ticket?pnr=${result.booking.pnr}`);
      } else {
        alert(result?.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Network error while completing booking.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="grow flex flex-col items-center justify-center p-8 text-gray-500 font-semibold gap-3">
          <Spinner animation="border" variant="primary" />
          <span>Preparing reservation summary...</span>
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
        <div className="max-w-225 mx-auto space-y-6">
          
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-irctc-blue">Complete Your Ticket Booking</h2>
            <button
              onClick={() => navigate('/trains')}
              className="text-xs font-bold text-gray-500 hover:text-irctc-orange transition cursor-pointer"
            >
              ← Back to Trains
            </button>
          </div>

          {/* Train Summary Card */}
          {train && selectedClassObj && searchContext && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-irctc-orange uppercase tracking-wider">
                    {train.trainNumber} - {train.trainName}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">
                    {searchContext.sourceName} → {searchContext.destName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Date: <strong>{searchContext.date}</strong> | Selected Class:{' '}
                    <strong className="text-irctc-blue">
                      {CLASS_NAMES[selectedClassObj.classType] || selectedClassObj.classType}
                    </strong>
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-400 uppercase">Fare per traveler</p>
                  <p className="text-2xl font-black text-irctc-blue">
                    ₹{selectedClassObj.baseFare.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Class Switcher */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-600 mr-1">Choose Class:</span>
                {(train.availableClasses || []).map((c) => {
                  const isSelected = c.classType === selectedClassObj.classType;
                  return (
                    <button
                      key={c.classType}
                      type="button"
                      onClick={() => handleSwitchClass(c.classType)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-irctc-orange text-white shadow-sm ring-2 ring-orange-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                      }`}
                    >
                      <span>{c.classType}</span>
                      <span className="text-[10px] opacity-80">(₹{c.baseFare})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Passenger Details Section */}
          <form onSubmit={handleSubmitBooking} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="text-lg font-bold text-irctc-blue">Passenger Details</h3>
                <button
                  type="button"
                  onClick={addPassenger}
                  className="bg-blue-50 text-irctc-blue hover:bg-blue-100 font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 cursor-pointer"
                >
                  + Add Passenger
                </button>
              </div>

              {/* Dynamic Passenger Rows */}
              <div className="space-y-4">
                {passengers.map((p, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 relative"
                  >
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={p.name}
                        onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                        placeholder="Passenger Name"
                        className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none focus:ring-1 focus:ring-irctc-blue"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="100"
                        value={p.age}
                        onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                        placeholder="Age"
                        className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none focus:ring-1 focus:ring-irctc-blue"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Gender
                      </label>
                      <select
                        value={p.gender}
                        onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none focus:ring-1 focus:ring-irctc-blue"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Berth Preference
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={p.berth}
                          onChange={(e) => handlePassengerChange(idx, 'berth', e.target.value)}
                          className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none focus:ring-1 focus:ring-irctc-blue"
                        >
                          <option value="No Preference">No Preference</option>
                          <option value="Lower">Lower</option>
                          <option value="Middle">Middle</option>
                          <option value="Upper">Upper</option>
                          <option value="Side Lower">Side Lower</option>
                        </select>
                        {passengers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePassenger(idx)}
                            className="text-gray-400 hover:text-red-500 font-bold px-2 py-1 cursor-pointer"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary & Mode Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold text-irctc-blue pb-2 border-b">Payment & Summary</h3>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-600">Total Calculated Fare</p>
                  <p className="text-2xl font-black text-irctc-orange">
                    ₹{totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Your E-Wallet Balance</p>
                  <p className="text-sm font-bold text-irctc-blue">
                    ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-900 mb-2 text-sm">Select Payment Mode</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="ewallet"
                      checked={paymentMode === 'ewallet'}
                      onChange={() => setPaymentMode('ewallet')}
                      className="accent-irctc-orange w-4 h-4"
                    />
                    <span className="font-semibold">IRCTC E-Wallet</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="upi"
                      checked={paymentMode === 'upi'}
                      onChange={() => setPaymentMode('upi')}
                      className="accent-irctc-orange w-4 h-4"
                    />
                    <span className="font-semibold text-gray-700">UPI / BHIM (Mock Instant Pay)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="card"
                      checked={paymentMode === 'card'}
                      onChange={() => setPaymentMode('card')}
                      className="accent-irctc-orange w-4 h-4"
                    />
                    <span className="font-semibold text-gray-700">Credit / Debit Card (Mock Instant Pay)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-sm transition text-sm cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {submitting && <Spinner animation="border" size="sm" />}
                  {submitting ? 'Processing Payment...' : 'Proceed to Pay & Book'}
                </button>
              </div>
            </div>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Booking;
