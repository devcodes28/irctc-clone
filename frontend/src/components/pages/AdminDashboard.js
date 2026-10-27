import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';

/**
 * AdminDashboard Page Component
 * Demonstrates:
 * - useState for tab switching, forms, and dataset filtering (PPT Slide 55-60)
 * - useEffect for real-time data synchronization with MongoDB (PPT Slide 67-70)
 * - useRef for Chart.js rendering (PPT Slide 71-76)
 * - useCallback for chart instance lifecycle handling (PPT Slide 71-76)
 * - Conditional rendering across tabs and dynamic listing (PPT Slide 56-62, 91-93)
 * - Full IRCTC theme parity: Crisp white cards, IRCTC blue header, IRCTC orange buttons
 */
function AdminDashboard() {
  const navigate = useNavigate();

  // --- Auth Guard ---
  useEffect(() => {
    if (localStorage.getItem('irctc_admin_auth') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  // ── Tab State ──
  const [activeTab, setActiveTab] = useState('overview');

  // ── Overview State ──
  const [stats, setStats] = useState(null);
  const [liveBookings, setLiveBookings] = useState([]);
  const bookingsChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const bookingsChartInstance = useRef(null);
  const revenueChartInstance = useRef(null);

  // ── Trains State ──
  const [trains, setTrains] = useState([]);
  const [trainSearch, setTrainSearch] = useState('');
  const [showAddTrain, setShowAddTrain] = useState(false);
  const [newTrain, setNewTrain] = useState({
    trainNumber: '',
    trainName: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    totalSeats: '',
    fare: ''
  });
  const [trainMsg, setTrainMsg] = useState({ type: '', text: '' });

  // ── Users State ──
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');

  // ── Alerts State ──
  const [alertsList, setAlertsList] = useState([]);
  const [alertForm, setAlertForm] = useState({ userId: '', type: 'info', title: '', message: '' });
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' });

  // ─────────────────────────────────────────────────────────────────
  // Overview — fetch stats + bookings + draw charts
  // ─────────────────────────────────────────────────────────────────
  const buildCharts = useCallback((statsData) => {
    if (!window.Chart) return;

    if (bookingsChartInstance.current) bookingsChartInstance.current.destroy();
    if (revenueChartInstance.current) revenueChartInstance.current.destroy();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (bookingsChartRef.current) {
      bookingsChartInstance.current = new window.Chart(bookingsChartRef.current, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Bookings',
              data: statsData?.monthlyBookings || [42, 68, 95, 110, 145, 130, 160, 175, 190, 215, 240, 260],
              backgroundColor: '#213d77',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    if (revenueChartRef.current) {
      revenueChartInstance.current = new window.Chart(revenueChartRef.current, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Revenue (₹)',
              data: statsData?.monthlyRevenue || [45000, 62000, 89000, 115000, 140000, 135000, 172000, 190000, 210000, 245000, 280000, 310000],
              borderColor: '#fb792b',
              backgroundColor: 'rgba(251, 121, 43, 0.1)',
              fill: true,
              tension: 0.35,
              borderWidth: 3,
              pointBackgroundColor: '#fb792b',
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'overview') return;
    async function loadOverview() {
      try {
        const [statsData, bookingsData] = await Promise.all([
          api.getAdminStats(),
          api.getAllBookings ? api.getAllBookings() : Promise.resolve([])
        ]);
        setStats(statsData);
        setLiveBookings(Array.isArray(bookingsData) ? bookingsData.slice(0, 10) : []);
        requestAnimationFrame(() => buildCharts(statsData));
      } catch (err) {
        console.error('Failed to load admin overview:', err);
        setStats({ totalUsers: 0, totalTrains: 0, totalBookings: 0, totalRevenue: 0 });
        buildCharts({});
      }
    }
    loadOverview();
  }, [activeTab, buildCharts]);

  // ─────────────────────────────────────────────────────────────────
  // Trains Tab
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== 'trains') return;
    api.getAllTrains().then(setTrains).catch(console.error);
  }, [activeTab]);

  const filteredTrains = trains.filter(
    (t) =>
      t.trainNumber?.toString().includes(trainSearch) ||
      t.trainName?.toLowerCase().includes(trainSearch.toLowerCase()) ||
      (t.originCode || t.origin || t.sourceStation?.code || '')?.toLowerCase().includes(trainSearch.toLowerCase()) ||
      (t.destinationCode || t.destination || t.destinationStation?.code || '')?.toLowerCase().includes(trainSearch.toLowerCase()) ||
      (t.originName || t.sourceStation?.name || '')?.toLowerCase().includes(trainSearch.toLowerCase()) ||
      (t.destinationName || t.destinationStation?.name || '')?.toLowerCase().includes(trainSearch.toLowerCase())
  );

  async function handleDeleteTrain(id) {
    if (!window.confirm('Are you sure you want to delete this train from MongoDB?')) return;
    try {
      await api.deleteTrain(id);
      setTrains((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert('Failed to delete train: ' + err.message);
    }
  }

  async function handleAddTrain(e) {
    e.preventDefault();
    setTrainMsg({ type: '', text: '' });
    try {
      const created = await api.addTrain({
        ...newTrain,
        originCode: newTrain.origin,
        destinationCode: newTrain.destination,
        totalSeats: Number(newTrain.totalSeats),
        fare: Number(newTrain.fare)
      });
      const addedTrain = created.train || created;
      setTrains((prev) => [...prev, addedTrain]);
      setShowAddTrain(false);
      setNewTrain({ trainNumber: '', trainName: '', origin: '', destination: '', departureTime: '', arrivalTime: '', totalSeats: '', fare: '' });
      setTrainMsg({ type: 'success', text: 'Train added successfully to MongoDB Atlas!' });
    } catch (err) {
      setTrainMsg({ type: 'error', text: err.message || 'Failed to add train.' });
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // Users Tab
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== 'users') return;
    api.getAdminUsers()
      .then((data) => setUsers(Array.isArray(data) ? data : (data.users || [])))
      .catch(console.error);
  }, [activeTab]);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.mobile?.includes(userSearch)
  );

  async function handleDeleteUser(id) {
    if (!window.confirm('Are you sure you want to remove this user account?')) return;
    try {
      await api.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert('Failed to delete user: ' + err.message);
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // Alerts Tab
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== 'alerts') return;
    async function loadAlerts() {
      try {
        const response = await fetch('http://localhost:5000/api/admin/alerts');
        const data = await response.json();
        if (data.success && data.alerts) {
          setAlertsList(data.alerts);
        }
      } catch (err) {
        console.error('Failed to load alerts:', err);
      }
    }
    loadAlerts();
  }, [activeTab]);

  async function handleBroadcastAlert(e) {
    e.preventDefault();
    setAlertMsg({ type: '', text: '' });
    try {
      const res = await api.createBroadcastAlert({
        title: alertForm.title.trim() || undefined,
        message: alertForm.message.trim(),
        type: alertForm.type,
        userId: alertForm.userId ? alertForm.userId.trim() : null
      });
      if (res && res.success) {
        setAlertMsg({ type: 'success', text: 'Advisory broadcasted to passengers successfully!' });
        setAlertForm({ userId: '', type: 'info', title: '', message: '' });
        if (res.alert) {
          setAlertsList((prev) => [res.alert, ...prev]);
        }
      } else {
        setAlertMsg({ type: 'error', text: res?.message || 'Failed to broadcast alert.' });
      }
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Network error broadcasting alert.' });
    }
  }

  async function handleDeleteAlert(id) {
    if (!window.confirm('Delete this broadcast alert?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/alerts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAlertsList((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (err) {
      alert('Failed to delete alert: ' + err.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem('irctc_admin_auth');
    localStorage.removeItem('is_admin');
    navigate('/admin');
  }

  const tabs = [
    { id: 'overview', label: ' System Overview' },
    { id: 'trains', label: ' Manage Trains' },
    { id: 'users', label: ' Passenger Accounts' },
    { id: 'alerts', label: ' Broadcast Advisories' }
  ];

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col relative">
      <TrainAnimation />

      {/* Admin Header Navbar */}
      <header className="w-full relative z-30 px-4 md:px-8 pt-4 md:pt-6 shrink-0">
        <div className="max-w-350 mx-auto bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 px-6">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-2xl font-black text-irctc-blue no-underline tracking-tight">
                IRCTC <span className="text-irctc-orange">Admin</span>
              </Link>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-irctc-blue border border-blue-200">
                CRIS Operations Control
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Database: <strong>MongoDB Atlas</strong></span>
              </div>

              <Link
                to="/dashboard"
                className="text-xs font-bold text-gray-600 hover:text-irctc-blue no-underline"
              >
                Passenger View
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <main className="w-full relative z-10 px-4 md:px-8 py-6 grow max-w-350 mx-auto">
        
        {/* Navigation Tabs Pill Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-irctc-blue text-white shadow-sm'
                    : 'text-gray-600 hover:text-irctc-blue hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── 1. OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Hero Welcome Strip */}
            <div
              style={{ background: 'linear-gradient(to right, #213d77, #1e40af)' }}
              className="rounded-2xl p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div>
                <span className="text-irctc-orange text-xs font-bold tracking-widest uppercase">
                  Central Railway Monitoring
                </span>
                <h1 className="text-2xl md:text-3xl font-black mt-1">
                  System Overview & Live Performance
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                  Real-time ticket reservations, fleet status, and financial ledger data synced with MongoDB Atlas.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-5 py-3 shrink-0">
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Engine Status</p>
                  <p className="text-sm font-bold text-white">Live & Synchronized</p>
                </div>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Passengers</p>
                  <p className="text-3xl font-black text-irctc-blue mt-1">{stats?.totalUsers ?? '—'}</p>
                  <p className="text-[11px] text-green-600 font-bold mt-1">Registered accounts</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-irctc-blue flex items-center justify-center text-2xl font-bold">
                  👥
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Trains</p>
                  <p className="text-3xl font-black text-irctc-blue mt-1">{stats?.totalTrains ?? '—'}</p>
                  <p className="text-[11px] text-blue-600 font-bold mt-1">Scheduled routes</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-2xl font-bold">
                  🚂
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Bookings</p>
                  <p className="text-3xl font-black text-irctc-blue mt-1">{stats?.totalBookings ?? '—'}</p>
                  <p className="text-[11px] text-orange-600 font-bold mt-1">Confirmed & ERS issued</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-irctc-orange flex items-center justify-center text-2xl font-bold">
                  🎫
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gross Revenue</p>
                  <p className="text-2xl font-black text-irctc-blue mt-1">
                    ₹{Number(stats?.totalRevenue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-[11px] text-purple-600 font-bold mt-1">Ticket receipts & wallet</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-bold">
                  💰
                </div>
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                    Monthly Bookings Velocity
                  </h3>
                  <span className="text-xs font-bold text-irctc-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    2026 Volume
                  </span>
                </div>
                <div className="h-65 w-full">
                  <canvas ref={bookingsChartRef}></canvas>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                    Gross Revenue Trend (₹)
                  </h3>
                  <span className="text-xs font-bold text-irctc-orange bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    Financial Ledger
                  </span>
                </div>
                <div className="h-65 w-full">
                  <canvas ref={revenueChartRef}></canvas>
                </div>
              </div>
            </div>

            {/* Live Recent Bookings Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Recent Live Reservations</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Most recent Electronic Reservation Slips (ERS) across all routes</p>
                </div>
                <span className="text-xs font-bold text-gray-600 bg-white px-3 py-1 rounded-lg border border-gray-200">
                  Showing latest {liveBookings.length}
                </span>
              </div>

              {liveBookings.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">No recent bookings found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-6 font-semibold">PNR Number</th>
                        <th className="py-3 px-6 font-semibold">Train</th>
                        <th className="py-3 px-6 font-semibold">Journey Route</th>
                        <th className="py-3 px-6 font-semibold">Date</th>
                        <th className="py-3 px-6 font-semibold">Amount</th>
                        <th className="py-3 px-6 font-semibold">Booking Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {liveBookings.map((b) => {
                        const routeStr = `${b.originCode || b.origin || 'NDLS'} ➔ ${b.destinationCode || b.destination || 'BCT'}`;
                        const fareVal = b.fareDetails?.totalFare ?? b.totalFare ?? b.fare ?? 500;
                        const statusVal = b.bookingStatus || b.status || 'Confirmed';
                        const isCancelled = statusVal === 'Cancelled';

                        return (
                          <tr key={b._id} className="hover:bg-blue-50/40 transition">
                            <td className="py-3.5 px-6 font-mono font-bold text-irctc-blue">{b.pnr}</td>
                            <td className="py-3.5 px-6 font-semibold">{b.trainNumber}</td>
                            <td className="py-3.5 px-6 text-gray-700">{routeStr}</td>
                            <td className="py-3.5 px-6 text-gray-600">{b.travelDate || '—'}</td>
                            <td className="py-3.5 px-6 font-bold text-gray-900">₹{Number(fareVal).toFixed(2)}</td>
                            <td className="py-3.5 px-6">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                  isCancelled
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : 'bg-green-50 text-green-700 border-green-200'
                                }`}
                              >
                                {statusVal}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 2. MANAGE TRAINS TAB ── */}
        {activeTab === 'trains' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-irctc-blue">Fleet & Route Management</h2>
                <p className="text-xs text-gray-500 mt-1">Configure trains, origin-destination stations, base fares, and seat quotas.</p>
              </div>
              <button
                onClick={() => setShowAddTrain(true)}
                className="bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md transition cursor-pointer"
              >
                + Add New Train
              </button>
            </div>

            {trainMsg.text && (
              <div
                className={`p-4 rounded-xl text-sm font-semibold border ${
                  trainMsg.type === 'success'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {trainMsg.text}
              </div>
            )}

            {/* Search Filter Strip */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search train by number, name, station code..."
                value={trainSearch}
                onChange={(e) => setTrainSearch(e.target.value)}
                className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
              />
              <span className="text-xs font-bold text-gray-500 shrink-0">
                {filteredTrains.length} Trains in Catalog
              </span>
            </div>

            {/* Trains Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-6 font-semibold">Number</th>
                      <th className="py-3 px-6 font-semibold">Train Name</th>
                      <th className="py-3 px-6 font-semibold">Origin</th>
                      <th className="py-3 px-6 font-semibold">Destination</th>
                      <th className="py-3 px-6 font-semibold">Departure</th>
                      <th className="py-3 px-6 font-semibold">Arrival</th>
                      <th className="py-3 px-6 font-semibold">Capacity</th>
                      <th className="py-3 px-6 font-semibold">Base Fare</th>
                      <th className="py-3 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTrains.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-10 text-gray-500">
                          No matching trains found.
                        </td>
                      </tr>
                    ) : (
                      filteredTrains.map((t) => {
                        const originDisplay = t.originCode || t.origin || t.sourceStation?.code || '—';
                        const destDisplay = t.destinationCode || t.destination || t.destinationStation?.code || '—';
                        const seatsDisplay = t.totalSeats || t.availableClasses?.[0]?.availableSeats || t.classes?.[0]?.totalSeats || 120;
                        const fareDisplay = t.fare || t.availableClasses?.[0]?.baseFare || t.classes?.[0]?.baseFare || 450;

                        return (
                          <tr key={t._id} className="hover:bg-blue-50/40 transition">
                            <td className="py-3.5 px-6 font-mono font-bold text-irctc-blue">{t.trainNumber}</td>
                            <td className="py-3.5 px-6 font-bold text-gray-900">{t.trainName}</td>
                            <td className="py-3.5 px-6 font-semibold text-gray-700">{originDisplay}</td>
                            <td className="py-3.5 px-6 font-semibold text-gray-700">{destDisplay}</td>
                            <td className="py-3.5 px-6 text-gray-600">{t.departureTime || '06:00 AM'}</td>
                            <td className="py-3.5 px-6 text-gray-600">{t.arrivalTime || '02:00 PM'}</td>
                            <td className="py-3.5 px-6 text-gray-700">{seatsDisplay} seats</td>
                            <td className="py-3.5 px-6 font-bold text-gray-900">₹{fareDisplay}</td>
                            <td className="py-3.5 px-6 text-right">
                              <button
                                onClick={() => handleDeleteTrain(t._id)}
                                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Train Modal */}
            {showAddTrain && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-irctc-blue">Add New Train to Fleet</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Saves directly to MongoDB Atlas cluster</p>
                    </div>
                    <button
                      onClick={() => setShowAddTrain(false)}
                      className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddTrain} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Train Number *</label>
                        <input
                          type="text"
                          required
                          value={newTrain.trainNumber}
                          onChange={(e) => setNewTrain({ ...newTrain, trainNumber: e.target.value })}
                          placeholder="e.g. 12952"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Train Name *</label>
                        <input
                          type="text"
                          required
                          value={newTrain.trainName}
                          onChange={(e) => setNewTrain({ ...newTrain, trainName: e.target.value })}
                          placeholder="e.g. Mumbai Rajdhani"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Origin Code *</label>
                        <input
                          type="text"
                          required
                          value={newTrain.origin}
                          onChange={(e) => setNewTrain({ ...newTrain, origin: e.target.value })}
                          placeholder="e.g. BCT"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none uppercase"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Destination Code *</label>
                        <input
                          type="text"
                          required
                          value={newTrain.destination}
                          onChange={(e) => setNewTrain({ ...newTrain, destination: e.target.value })}
                          placeholder="e.g. NDLS"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Departure Time</label>
                        <input
                          type="text"
                          value={newTrain.departureTime}
                          onChange={(e) => setNewTrain({ ...newTrain, departureTime: e.target.value })}
                          placeholder="e.g. 04:55 PM"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Arrival Time</label>
                        <input
                          type="text"
                          value={newTrain.arrivalTime}
                          onChange={(e) => setNewTrain({ ...newTrain, arrivalTime: e.target.value })}
                          placeholder="e.g. 08:35 AM"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Total Seats</label>
                        <input
                          type="number"
                          value={newTrain.totalSeats}
                          onChange={(e) => setNewTrain({ ...newTrain, totalSeats: e.target.value })}
                          placeholder="e.g. 180"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Base Fare (₹)</label>
                        <input
                          type="number"
                          value={newTrain.fare}
                          onChange={(e) => setNewTrain({ ...newTrain, fare: e.target.value })}
                          placeholder="e.g. 850"
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setShowAddTrain(false)}
                        className="flex-1 border border-gray-300 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition text-sm cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-irctc-orange hover:bg-orange-600 text-white py-2.5 rounded-xl font-bold shadow-md transition text-sm cursor-pointer"
                      >
                        Create Train
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── 3. MANAGE USERS TAB ── */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-irctc-blue">Passenger Accounts Directory</h2>
              <p className="text-xs text-gray-500 mt-1">Audit registered users, manage profiles, and review live wallet balances.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search passengers by name, email, or mobile..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
              />
              <span className="text-xs font-bold text-gray-500 shrink-0">
                {filteredUsers.length} Users Registered
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-6 font-semibold">Full Name</th>
                      <th className="py-3 px-6 font-semibold">Email</th>
                      <th className="py-3 px-6 font-semibold">Mobile</th>
                      <th className="py-3 px-6 font-semibold">Wallet Balance</th>
                      <th className="py-3 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-500">
                          No users found matching query.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u._id} className="hover:bg-blue-50/40 transition">
                          <td className="py-3.5 px-6 font-bold text-gray-900">{u.fullName}</td>
                          <td className="py-3.5 px-6 text-gray-600">{u.email}</td>
                          <td className="py-3.5 px-6 font-mono text-gray-700">{u.mobile || '—'}</td>
                          <td className="py-3.5 px-6 font-bold text-green-700">
                            ₹{Number(u.walletBalance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                            >
                              Delete Account
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── 4. BROADCAST ALERTS TAB ── */}
        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Alert Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-irctc-blue">Broadcast Travel Advisory</h2>
                <p className="text-xs text-gray-500 mt-1">Dispatches notifications instantly to passenger alerts dashboards</p>
              </div>

              {alertMsg.text && (
                <div
                  className={`mb-5 p-4 rounded-xl text-sm font-semibold border ${
                    alertMsg.type === 'success'
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  {alertMsg.text}
                </div>
              )}

              <form onSubmit={handleBroadcastAlert} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Advisory Title</label>
                  <input
                    type="text"
                    value={alertForm.title}
                    onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                    placeholder="e.g. Fog Safety Advisory or Monsoon Schedule Update"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Alert Severity</label>
                  <select
                    value={alertForm.type}
                    onChange={(e) => setAlertForm({ ...alertForm, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none bg-white"
                  >
                    <option value="info">Information (Blue)</option>
                    <option value="warning">Travel Advisory (Orange)</option>
                    <option value="critical">Critical Urgency (Red)</option>
                    <option value="success">System Notice (Green)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Passenger (Optional)</label>
                  <input
                    type="text"
                    value={alertForm.userId}
                    onChange={(e) => setAlertForm({ ...alertForm, userId: e.target.value })}
                    placeholder="Leave empty to broadcast to ALL passengers"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Advisory Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={alertForm.message}
                    onChange={(e) => setAlertForm({ ...alertForm, message: e.target.value })}
                    placeholder="Type official notification message here..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-irctc-blue focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition cursor-pointer text-sm"
                >
                  Broadcast Advisory to All Passengers
                </button>
              </form>
            </div>

            {/* Active Feed Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-irctc-blue">Active Broadcast Feed</h3>
                  <p className="text-xs text-gray-500 mt-1">Live advisories delivered across portal</p>
                </div>
                <span className="text-xs font-bold bg-blue-50 text-irctc-blue px-3 py-1 rounded-lg border border-blue-200">
                  {alertsList.length} Active
                </span>
              </div>

              {alertsList.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">No active broadcast advisories.</div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {alertsList.map((a) => {
                    let borderClass = 'border-blue-200 bg-blue-50/50';
                    let badgeClass = 'bg-blue-100 text-blue-800';

                    if (a.type === 'warning') {
                      borderClass = 'border-orange-200 bg-orange-50/50';
                      badgeClass = 'bg-orange-100 text-orange-800';
                    } else if (a.type === 'critical') {
                      borderClass = 'border-red-200 bg-red-50/50';
                      badgeClass = 'bg-red-100 text-red-800';
                    } else if (a.type === 'success') {
                      borderClass = 'border-green-200 bg-green-50/50';
                      badgeClass = 'bg-green-100 text-green-800';
                    }

                    return (
                      <div key={a._id} className={`p-4 rounded-xl border ${borderClass} flex justify-between items-start gap-4`}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeClass}`}>
                              {a.type || 'info'}
                            </span>
                            <span className="font-bold text-gray-900 text-sm">{a.title || 'System Notice'}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">{a.message}</p>
                          <p className="text-[10px] text-gray-400">
                            {a.createdAt ? new Date(a.createdAt).toLocaleString('en-IN') : 'Recently posted'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteAlert(a._id)}
                          className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
