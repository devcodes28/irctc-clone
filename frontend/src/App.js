import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './components/pages/Home';
import TrainSearch from './components/pages/TrainSearch';
import SearchResults from './components/pages/SearchResults';
import Booking from './components/pages/Booking';
import Ticket from './components/pages/Ticket';
import MyBookings from './components/pages/MyBookings';
import Dashboard from './components/pages/Dashboard';
import Ewallet from './components/pages/Ewallet';
import Alerts from './components/pages/Alerts';
import ContactUs from './components/pages/ContactUs';
import Holidays from './components/pages/Holidays';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ForgotPassword from './components/pages/ForgotPassword';
import Profile from './components/pages/Profile';
import AdminLogin from './components/pages/AdminLogin';
import AdminDashboard from './components/pages/AdminDashboard';

import './App.css';

/**
 * App Component — Root of the React application
 * Demonstrates:
 * - React Router v6 (BrowserRouter, Routes, Route) (PPT Slide 82-85)
 * - Context API provider wrapping (PPT Slide 77-78)
 * - Single-page application routing without page reloads
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/trains" element={<TrainSearch />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Authenticated user routes */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/e-wallet" element={<Ewallet />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
