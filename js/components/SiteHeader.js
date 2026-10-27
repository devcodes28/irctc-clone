import React from "react";
import { useAuth } from "../context/AuthContext.js";

const links = [
  { label: "Home", href: "/pages/home.html", page: "home" },
  { label: "Trains", href: "/pages/TrainSearch.html", page: "TrainSearch" },
  { label: "Holidays", href: "/pages/holidays.html", page: "holidays" },
  { label: "Alerts", href: "/pages/alerts.html", page: "alerts" },
  { label: "Contact Us", href: "/pages/contact-us.html", page: "contact-us" },
];

export default function SiteHeader({ page, className }) {
  const { user, isAuthenticated } = useAuth();

  function handleAuthAction() {
    if (isAuthenticated) {
      window.DB_API.logoutUser();
      return;
    }

    window.location.href = "/pages/login.html";
  }

  return (
    <header className={className}>
      <div className="max-w-300 mx-auto bg-white rounded-lg shadow-sm">
        <nav className="flex items-center justify-between p-4 mb-0">
          <a href="/pages/home.html" className="flex items-center cursor-pointer">
            <span className="text-3xl font-bold text-irctc-blue">IRCTC</span>
          </a>

          <div className="hidden md:flex space-x-6 items-center">
            {links.slice(0, 3).map((link) => (
              <a
                key={link.page}
                href={link.href}
                className={
                  page === link.page
                    ? "text-irctc-orange font-bold border-b-2 border-irctc-orange pb-1 transition-colors"
                    : "text-gray-700 hover:text-irctc-orange font-semibold transition-colors"
                }
              >
                {link.label}
              </a>
            ))}
            {isAuthenticated && page !== "TrainSearch" && (
              <a
                href="/pages/dashboard.html"
                className="text-gray-700 hover:text-irctc-orange font-semibold transition-colors"
              >
                Dashboard
              </a>
            )}
            {isAuthenticated && (
              <a
                href="/pages/e-wallet.html"
                className="text-gray-700 hover:text-irctc-orange font-semibold transition-colors"
              >
                E-wallet
              </a>
            )}
            {links.slice(3).map((link) => (
              <a
                key={link.page}
                href={link.href}
                className={
                  page === link.page
                    ? "text-irctc-orange font-bold border-b-2 border-irctc-orange pb-1 transition-colors flex items-center"
                    : "text-gray-700 hover:text-irctc-orange font-semibold transition-colors flex items-center"
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/pages/my-bookings.html"
              className="border-2 border-irctc-blue text-irctc-blue hover:bg-blue-50 font-bold py-2 px-4 rounded transition-colors text-sm"
            >
              My Bookings
            </a>
            <button
              type="button"
              onClick={handleAuthAction}
              className={
                isAuthenticated
                  ? "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                  : "bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
              }
              aria-label={isAuthenticated ? `Log out ${user?.fullName || "account"}` : "Login or register"}
            >
              {isAuthenticated ? "Logout" : "Login / Register"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
