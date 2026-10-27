import React, { useLayoutEffect } from "react";
import AnimatedGrid from "./AnimatedGrid.js";
import SiteFooter from "./SiteFooter.js";
import SiteHeader from "./SiteHeader.js";

const pageTitles = {
  "admin-dashboard": "Admin Command Center | IRCTC",
  admin: "Admin Login | IRCTC Clone",
  alerts: "Alerts & Notifications | IRCTC Clone",
  booking: "Book Ticket | IRCTC Clone",
  "contact-us": "Contact Us | IRCTC Clone",
  dashboard: "User Dashboard | IRCTC Clone",
  "e-wallet": "E-Wallet | IRCTC Clone",
  "forgot-password": "Forgot Password | IRCTC Clone",
  holidays: "Holiday Packages | IRCTC Clone",
  home: "IRCTC Clone - Ticket Booking",
  login: "Login | IRCTC Clone",
  "my-bookings": "My Bookings | IRCTC Clone",
  profile: "Account Profile | IRCTC Clone",
  "search-results": "Train Search Results | IRCTC Clone",
  signup: "Register | IRCTC Clone",
  ticket: "View Ticket | IRCTC Clone",
  TrainSearch: "Train Services | IRCTC Clone",
};

export default function PageLayout({
  page,
  bodyClass,
  headerClass,
  footerClass,
  hasHeader,
  customHeader,
  hasFooter,
  children,
}) {
  useLayoutEffect(() => {
    const previousClassName = document.body.className;
    const previousTitle = document.title;
    document.body.className = bodyClass;
    document.title = pageTitles[page] || pageTitles.home;

    return () => {
      document.body.className = previousClassName;
      document.title = previousTitle;
    };
  }, [bodyClass, page]);

  const isAdminPage = page === "admin" || page === "admin-dashboard";

  return (
    <>
      {!isAdminPage && <AnimatedGrid />}
      {hasHeader && !customHeader && (
        <SiteHeader page={page} className={headerClass} />
      )}
      {children}
      {hasFooter && <SiteFooter className={footerClass} />}
    </>
  );
}
