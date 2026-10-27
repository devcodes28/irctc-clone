import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";
import AdminDashboardPage from "./pages/admin-dashboard.js";
import AdminPage from "./pages/admin.js";
import AlertsPage from "./pages/alerts.js";
import BookingPage from "./pages/booking.js";
import ContactUsPage from "./pages/contact-us.js";
import DashboardPage from "./pages/dashboard.js";
import EWalletPage from "./pages/e-wallet.js";
import ForgotPasswordPage from "./pages/forgot-password.js";
import HolidaysPage from "./pages/holidays.js";
import HomePage from "./pages/home.js";
import LoginPage from "./pages/login.js";
import MyBookingsPage from "./pages/my-bookings.js";
import ProfilePage from "./pages/profile.js";
import SearchResultsPage from "./pages/search-results.js";
import SignupPage from "./pages/signup.js";
import TicketPage from "./pages/ticket.js";
import TrainSearchPage from "./pages/TrainSearch.js";

const pageRoutes = [
  ["home", "home", HomePage],
  ["TrainSearch", "TrainSearch", TrainSearchPage],
  ["admin-dashboard", "admin-dashboard", AdminDashboardPage],
  ["admin", "admin", AdminPage],
  ["alerts", "alerts", AlertsPage],
  ["booking", "booking", BookingPage],
  ["contact-us", "contact-us", ContactUsPage],
  ["dashboard", "dashboard", DashboardPage],
  ["e-wallet", "e-wallet", EWalletPage],
  ["forgot-password", "forgot-password", ForgotPasswordPage],
  ["holidays", "holidays", HolidaysPage],
  ["login", "login", LoginPage],
  ["my-bookings", "my-bookings", MyBookingsPage],
  ["profile", "profile", ProfilePage],
  ["search-results", "search-results", SearchResultsPage],
  ["signup", "signup", SignupPage],
  ["ticket", "ticket", TicketPage],
];

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Could not find the React root element "#root".');
}

createRoot(rootElement).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/register.html" element={<SignupPage />} />
        <Route path="/pages/register.html" element={<SignupPage />} />
        {pageRoutes.flatMap(([routeName, fileName, Page]) => [
          <Route
            key={`root-${routeName}`}
            path={`/${fileName}.html`}
            element={<Page />}
          />,
          <Route
            key={`pages-${routeName}`}
            path={`/pages/${fileName}.html`}
            element={<Page />}
          />,
        ])}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
);
