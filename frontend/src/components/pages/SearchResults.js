import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Spinner, Alert } from 'react-bootstrap';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CLASS_NAMES = {
  SL: 'Sleeper (SL)',
  '3A': 'AC 3 Tier (3A)',
  '2A': 'AC 2 Tier (2A)',
  '1A': 'AC First Class (1A)'
};

/**
 * SearchResults Page Component (Replicating search-results.html)
 * Demonstrates:
 * - Dynamic list rendering & mapping (PPT Slide 48-49)
 * - State-driven interactive selection for travel classes (PPT Slide 24 & 32)
 * - Conditional rendering for empty results and loading state (PPT Slide 56-62)
 */
function SearchResults() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [searchData, setSearchData] = useState(null);
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClasses, setSelectedClasses] = useState({});

  useEffect(() => {
    const savedSearch = localStorage.getItem('last_search');
    if (!savedSearch) {
      navigate('/trains');
      return;
    }

    const parsed = JSON.parse(savedSearch);
    setSearchData(parsed);

    const preferredClass = localStorage.getItem('selected_class_type') || parsed.travelClass || '';

    async function loadTrains() {
      try {
        setLoading(true);
        const results = await api.searchTrains(parsed.sourceCode, parsed.destCode);
        setTrains(results || []);

        // Initialize selected class for each train
        const initClasses = {};
        (results || []).forEach((t) => {
          const hasPreferred = (t.availableClasses || []).find((c) => c.classType === preferredClass);
          initClasses[t.trainNumber] = hasPreferred ? preferredClass : (t.availableClasses?.[0]?.classType || 'SL');
        });
        setSelectedClasses(initClasses);
      } catch (err) {
        console.error("Failed to load trains:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTrains();
  }, [navigate]);

  const handleSelectClass = (trainNumber, classType) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [trainNumber]: classType
    }));
    localStorage.setItem('selected_class_type', classType);
  };

  const handleProceedToBooking = (trainNumber) => {
    const chosenClass = selectedClasses[trainNumber] || 'SL';
    localStorage.setItem('selected_train', trainNumber);
    localStorage.setItem('selected_train_num', trainNumber);
    localStorage.setItem('selected_class_type', chosenClass);

    if (!isLoggedIn) {
      localStorage.setItem('redirect_to_booking', 'true');
      alert("Login to proceed with booking.");
      navigate('/login');
    } else {
      navigate('/booking');
    }
  };

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
        <div className="max-w-300 mx-auto">
          
          {/* Summary Strip */}
          {searchData && (
            <section className="bg-white border border-gray-200 shadow-sm rounded-lg mb-6">
              <div className="px-4 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">From</div>
                  <div className="font-bold text-irctc-blue">{searchData.sourceName}</div>
                </div>
                <span className="text-gray-400">➔</span>
                <div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">To</div>
                  <div className="font-bold text-irctc-blue">{searchData.destName}</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">Date</div>
                  <div className="font-bold text-gray-800">{searchData.date}</div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/trains')}
                  className="ml-auto bg-irctc-orange hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded transition-colors cursor-pointer"
                >
                  Modify Search
                </button>
              </div>
            </section>
          )}

          <div className="flex flex-col md:flex-row gap-5">
            <section className="flex-1 min-w-0">
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-4 text-sm overflow-x-auto">
                  <span className="text-gray-500 shrink-0">Sort by:</span>
                  <button type="button" className="shrink-0 text-irctc-blue font-semibold cursor-pointer">
                    Departure ↑
                  </button>
                </div>
                <span className="text-xs text-gray-500 shrink-0">
                  {trains.length} Results
                </span>
              </div>

              {loading && (
                <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200 d-flex flex-column align-items-center justify-content-center gap-2">
                  <Spinner animation="border" variant="primary" />
                  <span>Loading train search results...</span>
                </div>
              )}

              {!loading && trains.length === 0 && (
                <Alert variant="info" className="text-center my-3">
                  <Alert.Heading className="fs-6 fw-bold">No trains found</Alert.Heading>
                  <p className="mb-0 small">Try removing a filter or choosing a different route.</p>
                </Alert>
              )}

              {/* Train Cards List */}
              <div className="flex flex-col gap-3">
                {trains.map((train) => {
                  const currentClass = selectedClasses[train.trainNumber] || train.availableClasses[0]?.classType || 'SL';

                  return (
                    <div
                      key={train.trainNumber}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-2"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-100 pb-4 mb-4 gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {train.trainName}{' '}
                            <span className="text-gray-500 font-medium text-sm ml-1">
                              ({train.trainNumber})
                            </span>
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-semibold text-[11px]">
                            {train.originName} <span className="text-irctc-orange mx-1">➔</span> {train.destinationName}
                          </p>
                        </div>
                        <div className="text-left md:text-right flex flex-col items-start md:items-end w-full md:w-auto">
                          <p className="text-lg font-black text-irctc-blue">
                            {train.departureTime} <span className="text-gray-400 text-sm font-medium mx-1">—</span> {train.arrivalTime}
                          </p>
                          <button
                            onClick={() => handleProceedToBooking(train.trainNumber)}
                            className="mt-2 bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg text-xs tracking-wide transition shadow-sm w-full md:w-auto cursor-pointer"
                          >
                            Book {currentClass}
                          </button>
                        </div>
                      </div>

                      {/* Class Selection Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {train.availableClasses.map((cls) => {
                          const isSelected = cls.classType === currentClass;
                          const cardStyle = isSelected
                            ? 'border-2 border-irctc-orange bg-orange-50/60 rounded-xl p-3 text-center cursor-pointer shadow-sm transition ring-1 ring-irctc-orange'
                            : 'border border-gray-300 bg-gray-50 hover:bg-white rounded-xl p-3 text-center cursor-pointer hover:border-irctc-orange transition';

                          const classLabel = CLASS_NAMES[cls.classType] || cls.classType;

                          return (
                            <div
                              key={cls.classType}
                              onClick={() => handleSelectClass(train.trainNumber, cls.classType)}
                              className={cardStyle}
                            >
                              <div className="flex items-center justify-between">
                                <p className="font-bold text-irctc-blue text-sm">{cls.classType}</p>
                                <Badge bg="success" className="text-[10px] fw-bold">
                                  AVL {cls.availableSeats}
                                </Badge>
                              </div>
                              <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">{classLabel}</p>
                              <p className="text-base font-black text-gray-900 mt-2">
                                ₹{cls.baseFare.toLocaleString('en-IN')}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchResults;
