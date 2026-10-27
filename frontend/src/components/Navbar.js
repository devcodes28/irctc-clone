import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Standardized Header & Navbar Component
 * Demonstrates:
 * - PPT Slide 5 & 14: Reusable Component & Composition
 * - PPT Slide 42-44: Props and clean state consumption
 * - PPT Slide 56-64: Conditional rendering based on auth state
 * - PPT Slide 82-85: React Router navigation (NavLink, Link, useNavigate)
 */
function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-irctc-orange font-bold border-b-2 border-irctc-orange pb-1 transition-colors'
      : 'text-gray-700 hover:text-irctc-orange font-semibold transition-colors';

  return (
    <header className="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-6 shrink-0">
      <div className="max-w-300 mx-auto bg-white rounded-lg shadow-sm">
        <nav className="flex items-center justify-between p-4 mb-0">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center cursor-pointer no-underline">
            <span className="text-3xl font-bold text-irctc-blue">IRCTC</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/trains" className={navLinkClass}>
              Trains
            </NavLink>
            <NavLink to="/holidays" className={navLinkClass}>
              Holidays
            </NavLink>

            {/* Conditionally rendered links when user is authenticated (Slide 56-63) */}
            {isLoggedIn && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/profile" className={navLinkClass}>
                  Profile
                </NavLink>
                <NavLink to="/e-wallet" className={navLinkClass}>
                  E-wallet
                </NavLink>
              </>
            )}

            <NavLink to="/alerts" className={navLinkClass}>
              Alerts
            </NavLink>
            <NavLink to="/contact-us" className={navLinkClass}>
              Contact Us
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/my-bookings')}
              className="border-2 border-irctc-blue text-irctc-blue hover:bg-blue-50 font-bold py-2 px-4 rounded transition-colors text-sm cursor-pointer"
            >
              My Bookings
            </button>

            {/* Conditional Login / Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm cursor-pointer"
              >
                Login / Register
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
