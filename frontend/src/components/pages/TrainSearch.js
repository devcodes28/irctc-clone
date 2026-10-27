import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';

/**
 * TrainSearch Page Component (Replicating TrainSearch.html)
 * Demonstrates:
 * - PPT Slide 5 & 35: useState Hook for form inputs, modal visibility, and API states
 * - PPT Slide 65-72: useEffect Hook for station list loading & side effects
 * - PPT Slide 86-88: Controlled Components for form inputs
 */
function TrainSearch() {
  const navigate = useNavigate();

  // Form State (Controlled Components - PPT Slide 86-88)
  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(true);
  const [sourceCode, setSourceCode] = useState('');
  const [destCode, setDestCode] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelClass, setTravelClass] = useState('');
  const [quota, setQuota] = useState('General');

  // Modal States
  const [isPnrOpen, setIsPnrOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // PNR Check State
  const [pnrInput, setPnrInput] = useState('');
  const [pnrLoading, setPnrLoading] = useState(false);
  const [pnrResult, setPnrResult] = useState(null);
  const [pnrError, setPnrError] = useState('');

  // Train Schedule State
  const [allTrains, setAllTrains] = useState([]);
  const [selectedTrainNum, setSelectedTrainNum] = useState('');
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleResult, setScheduleResult] = useState(null);
  const [scheduleError, setScheduleError] = useState('');

  // 1. Fetch Dynamic Stations from MongoDB Atlas database (PPT Slide 66-67)
  useEffect(() => {
    let isMounted = true;
    async function fetchStations() {
      try {
        const data = await api.getStations();
        if (isMounted) {
          if (data && data.length > 0) {
            const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
            setStations(sorted);
          }
          setLoadingStations(false);
        }
      } catch (err) {
        console.error("Error fetching stations from database:", err);
        if (isMounted) setLoadingStations(false);
      }
    }
    fetchStations();
    return () => { isMounted = false; };
  }, []);

  // Handle Train Search Submission
  const handleSearchTrains = async (e) => {
    e.preventDefault();

    if (!sourceCode || !destCode || !travelDate) {
      alert('Please select Source, Destination, and Travel Date.');
      return;
    }

    if (sourceCode === destCode) {
      alert('Source and Destination cannot be the same.');
      return;
    }

    try {
      const matchingTrains = await api.searchTrains(sourceCode, destCode);

      if (!matchingTrains || matchingTrains.length === 0) {
        alert('No direct trains found between selected stations on this date. Please try another route.');
        return;
      }

      const sourceObj = stations.find((s) => s.code === sourceCode);
      const destObj = stations.find((s) => s.code === destCode);
      const sourceName = sourceObj ? `${sourceObj.name} (${sourceObj.code})` : sourceCode;
      const destName = destObj ? `${destObj.name} (${destObj.code})` : destCode;

      const searchPayload = {
        sourceCode,
        sourceName,
        destCode,
        destName,
        date: travelDate,
        travelClass,
        quota
      };

      localStorage.setItem('last_search', JSON.stringify(searchPayload));
      if (travelClass) {
        localStorage.setItem('selected_class_type', travelClass);
      } else {
        localStorage.removeItem('selected_class_type');
      }

      navigate('/search-results');
    } catch (err) {
      console.error("Connection error during train search:", err);
      alert("Server error. Ensure backend is running.");
    }
  };

  // PNR Status Handler
  const handleCheckPnr = async () => {
    if (!pnrInput.trim()) {
      alert("Please enter a PNR number.");
      return;
    }
    setPnrLoading(true);
    setPnrResult(null);
    setPnrError('');

    try {
      const booking = await api.getBookingByPNR(pnrInput.trim());
      if (!booking) {
        setPnrError(`No booking found for PNR: ${pnrInput.trim()}. Please check the number and try again.`);
        setPnrLoading(false);
        return;
      }

      const train = await api.getTrainDetails(booking.trainNumber);
      setPnrResult({ booking, train });
    } catch (err) {
      console.error("PNR check error:", err);
      setPnrError("Failed to fetch PNR status.");
    } finally {
      setPnrLoading(false);
    }
  };

  // Load Schedule Trains when opening schedule modal
  const openScheduleModal = async () => {
    setIsScheduleOpen(true);
    setScheduleResult(null);
    setScheduleError('');
    try {
      const trains = await api.getAllTrains();
      setAllTrains(trains || []);
    } catch (err) {
      console.error("Failed to load schedule trains:", err);
    }
  };

  // View Schedule Handler
  const handleViewSchedule = async () => {
    if (!selectedTrainNum) {
      alert("Please select a train.");
      return;
    }
    setScheduleLoading(true);
    setScheduleResult(null);
    setScheduleError('');

    try {
      const train = await api.getTrainDetails(selectedTrainNum);
      if (!train) {
        setScheduleError(`Train details not found for number: ${selectedTrainNum}.`);
      } else {
        setScheduleResult(train);
      }
    } catch (err) {
      console.error("Schedule error:", err);
      setScheduleError("Failed to load schedule.");
    } finally {
      setScheduleLoading(false);
    }
  };

  const closeModals = () => {
    setIsPnrOpen(false);
    setIsScheduleOpen(false);
    setPnrResult(null);
    setPnrError('');
    setScheduleResult(null);
    setScheduleError('');
  };

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col relative">
      <TrainAnimation />
      <Navbar />

      {/* CONTENT AREA */}
      <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
        <div className="max-w-300 mx-auto space-y-6">
          
          {/* Quick Navigation Action Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-900 text-white p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-200 uppercase font-semibold">Bookings</p>
                <h4 className="font-bold text-base">Book Train Tickets</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            
            <div
              onClick={() => { setIsPnrOpen(true); setPnrResult(null); setPnrError(''); }}
              className="bg-white hover:border-irctc-orange border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer transition group"
            >
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Enquiry</p>
                <h4 className="font-bold text-gray-900 group-hover:text-irctc-orange transition text-base">Check PNR Status</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-irctc-orange flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div
              onClick={openScheduleModal}
              className="bg-white hover:border-irctc-blue border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer transition group"
            >
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Schedule</p>
                <h4 className="font-bold text-gray-900 group-hover:text-irctc-blue transition text-base">Train Schedule</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-irctc-blue flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* BOOK TICKET CARD */}
          <div className="bg-white p-6 shadow-md rounded-2xl border-t-4 border-irctc-blue">
            <h2 className="text-2xl font-bold text-irctc-blue mb-6">Book Ticket</h2>
            
            <form onSubmit={handleSearchTrains} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1 text-sm">From</label>
                <select
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  required
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm"
                >
                  <option value="">{loadingStations ? "Loading stations..." : "Select Origin Station..."}</option>
                  {stations.map((st) => (
                    <option key={`src-${st.code}`} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1 text-sm">To</label>
                <select
                  value={destCode}
                  onChange={(e) => setDestCode(e.target.value)}
                  required
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm"
                >
                  <option value="">{loadingStations ? "Loading stations..." : "Select Destination Station..."}</option>
                  {stations.map((st) => (
                    <option key={`dest-${st.code}`} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1 text-sm">Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  required
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1 text-sm">Class</label>
                <select
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm"
                >
                  <option value="">All Classes</option>
                  <option value="SL">Sleeper (SL)</option>
                  <option value="3A">AC 3 Tier (3A)</option>
                  <option value="2A">AC 2 Tier (2A)</option>
                  <option value="1A">AC First Class (1A)</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1 text-sm">Quota</label>
                <select
                  value={quota}
                  onChange={(e) => setQuota(e.target.value)}
                  className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm"
                >
                  <option value="General">General</option>
                  <option value="Ladies">Ladies</option>
                  <option value="Tatkal">Tatkal</option>
                  <option value="Senior Citizen">Senior Citizen</option>
                </select>
              </div>

              <div className="flex items-end mt-2 lg:mt-0">
                <button
                  type="submit"
                  className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded shadow transition-colors text-sm cursor-pointer"
                >
                  Search Trains
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      {/* PNR CHECK MODAL */}
      {isPnrOpen && (
        <div className="fixed inset-0 z-50 flex bg-gray-900/60 backdrop-blur-sm items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-irctc-blue">Check PNR Status</h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Enter your 10-digit PNR number to check current confirmation status and coach details.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={pnrInput}
                onChange={(e) => setPnrInput(e.target.value)}
                placeholder="e.g. 8493028491"
                maxLength={10}
                className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-irctc-blue outline-none"
              />
              <button
                type="button"
                onClick={handleCheckPnr}
                disabled={pnrLoading}
                className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded text-sm transition cursor-pointer"
              >
                {pnrLoading ? "Searching..." : "Search PNR"}
              </button>
            </div>

            {pnrError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                ❌ {pnrError}
              </div>
            )}

            {pnrResult && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-green-900 text-sm">PNR: {pnrResult.booking.pnr}</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-white text-xs font-bold ${
                      pnrResult.booking.bookingStatus === 'Cancelled' ? 'bg-red-500' : 'bg-green-600'
                    }`}
                  >
                    {pnrResult.booking.bookingStatus || 'Confirmed'}
                  </span>
                </div>
                <p>
                  <strong>Train:</strong>{' '}
                  {pnrResult.train
                    ? `${pnrResult.train.trainNumber} - ${pnrResult.train.trainName}`
                    : pnrResult.booking.trainNumber}
                </p>
                <p>
                  <strong>Route:</strong>{' '}
                  {pnrResult.train ? `${pnrResult.train.originName} (${pnrResult.train.originCode})` : '—'} →{' '}
                  {pnrResult.train ? `${pnrResult.train.destinationName} (${pnrResult.train.destinationCode})` : '—'}
                </p>
                <p><strong>Travel Date:</strong> {pnrResult.booking.travelDate || '—'}</p>
                <p>
                  <strong>Class:</strong> {pnrResult.booking.classType || 'SL'} &nbsp;|&nbsp;{' '}
                  <strong>Fare:</strong> ₹{pnrResult.booking.fareDetails?.totalFare || '—'}
                </p>
                <div className="mt-2 pt-2 border-t border-green-200">
                  <p className="font-bold mb-1">Passengers:</p>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-green-800">
                        <th className="pr-3">Name</th>
                        <th className="pr-3">Age/Gen</th>
                        <th className="pr-3">Coach/Berth</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pnrResult.booking.passengers || []).map((p, i) => (
                        <tr key={i} className="border-t border-green-200">
                          <td className="py-1 pr-3">{i + 1}. {p.name || '—'}</td>
                          <td className="py-1 pr-3">{p.age || '—'}Y / {p.gender ? p.gender[0].toUpperCase() : '—'}</td>
                          <td className="py-1 pr-3">{p.coach || '—'} / {p.berth || '—'}</td>
                          <td className={`py-1 font-semibold ${p.status === 'CAN' ? 'text-red-600' : 'text-green-700'}`}>
                            {p.status || pnrResult.booking.bookingStatus || 'CNF'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={() => navigate(`/ticket?pnr=${pnrResult.booking.pnr}`)}
                  className="mt-2 w-full bg-irctc-blue text-white py-1.5 rounded font-bold cursor-pointer"
                >
                  📄 Open Full Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TRAIN SCHEDULE MODAL */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 flex bg-gray-900/60 backdrop-blur-sm items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-irctc-blue">Train Schedule & Timings</h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Select a train to view its complete route schedule and departure times.
            </p>
            <div className="space-y-3">
              <select
                value={selectedTrainNum}
                onChange={(e) => setSelectedTrainNum(e.target.value)}
                className="w-full border border-gray-300 rounded p-3 text-sm bg-white focus:ring-2 focus:ring-irctc-blue outline-none"
              >
                <option value="">Select Train...</option>
                {allTrains.map((t) => (
                  <option key={t.trainNumber} value={t.trainNumber}>
                    {t.trainNumber} - {t.trainName}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleViewSchedule}
                disabled={scheduleLoading}
                className="w-full bg-irctc-blue hover:bg-blue-900 text-white font-bold py-2.5 rounded text-sm transition cursor-pointer"
              >
                {scheduleLoading ? "Loading..." : "View Schedule"}
              </button>
            </div>

            {scheduleError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                ❌ {scheduleError}
              </div>
            )}

            {scheduleResult && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-2">
                <p className="font-bold text-irctc-blue text-sm">
                  🚂 {scheduleResult.trainNumber} - {scheduleResult.trainName}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="bg-white rounded p-2 border border-blue-100">
                    <p className="text-gray-400 uppercase text-xs font-semibold">Departs</p>
                    <p className="font-bold text-gray-800">{scheduleResult.originName}</p>
                    <p className="text-gray-500">
                      ({scheduleResult.originCode}) at <strong>{scheduleResult.departureTime}</strong>
                    </p>
                  </div>
                  <div className="bg-white rounded p-2 border border-blue-100">
                    <p className="text-gray-400 uppercase text-xs font-semibold">Arrives</p>
                    <p className="font-bold text-gray-800">{scheduleResult.destinationName}</p>
                    <p className="text-gray-500">
                      ({scheduleResult.destinationCode}) at <strong>{scheduleResult.arrivalTime}</strong>
                    </p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <p className="font-bold mb-1">Available Classes & Fares:</p>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-blue-800">
                        <th className="pr-4">Class</th>
                        <th className="pr-4">Base Fare</th>
                        <th>Seats</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(scheduleResult.availableClasses || []).map((c, i) => (
                        <tr key={i} className="border-t border-blue-200">
                          <td className="py-1 pr-4 font-semibold">{c.classType}</td>
                          <td className="py-1 pr-4">₹{c.baseFare}</td>
                          <td className={`py-1 ${c.availableSeats > 0 ? 'text-green-700' : 'text-red-600'}`}>
                            {c.availableSeats > 0 ? `${c.availableSeats} avail.` : 'Waitlist'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TrainSearch;
