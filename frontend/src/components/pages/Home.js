import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';

/**
 * Home Page Component (Replicating home.html)
 * Features:
 * - Hero banner with booking CTA
 * - Feature badges (Tatkal booking, Instant Refunds, Live Train Status)
 * - App download promotion with QR code
 */
function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-gray-800 font-sans min-h-screen flex flex-col bg-gray-50 m-0 relative">
      <TrainAnimation />
      <Navbar />

      {/* CONTENT AREA */}
      <main className="w-full relative z-10 px-4 md:px-8 py-3 grow">
        <div className="max-w-300 mx-auto">
          
          {/* Hero Banner */}
          <div style={{background:'linear-gradient(to right, #213d77, #1e40af)'}} className="p-8 text-white rounded-2xl shadow-md">
            <div className="relative z-10 px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-8">
              
              <div className="max-w-2xl text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                  Experience Seamless <span className="text-irctc-orange">Rail Journeys</span> Across India
                </h1>
                
                <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed">
                  Book train tickets, verify PNR status, track live train positions, and explore exclusive holiday packages with instant confirmation.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <button
                    onClick={() => navigate('/trains')}
                    className="w-full sm:w-auto bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all cursor-pointer"
                  >
                    Book Tickets Now
                  </button>
                  <button
                    onClick={() => navigate('/my-bookings')}
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
                  >
                    My Bookings
                  </button>
                </div>
              </div>

              {/* Right Side Stacked Feature Cards */}
              <div className="w-full md:w-80 grid grid-cols-1 gap-3 text-left">
                
                {/* Feature 1: Tatkal & General Booking */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-irctc-orange shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Tatkal & General Booking</h4>
                    <p className="text-[10px] text-gray-300">Fast & seamless ticket checkout</p>
                  </div>
                </div>

                {/* Feature 2: Instant Refunds */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-irctc-orange shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Instant Refunds</h4>
                    <p className="text-[10px] text-gray-300">Hassle-free cancellation policy</p>
                  </div>
                </div>

                {/* Feature 3: Live Train Status */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-irctc-orange shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Live Train Status</h4>
                    <p className="text-[10px] text-gray-300">Real-time GPS tracking updates</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* App Promotion Banner */}
          <section className="w-full mb-6 mt-6">
            <div style={{ background: 'linear-gradient(to right, #eff6ff, #ffffff)' }} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row items-center justify-between border border-gray-100 px-8 py-6">
              <div className="w-full md:w-3/4">
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight mb-2">
                  Your journey, <span className="text-irctc-blue">now just a tap away</span>
                </h2>
                <p className="text-gray-600 mb-4 font-medium text-xs md:text-sm">
                  Download the <strong>IRCTC RailConnect app</strong> to book your train tickets, anywhere, anytime.
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=cris.org.in.prs.ima"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-10 w-auto cursor-pointer"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/irctc-rail-connect/id1386197253"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      className="h-10 w-auto cursor-pointer"
                    />
                  </a>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center shrink-0">
                <a
                  href="https://play.google.com/store/apps/details?id=cris.org.in.prs.ima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow transition block"
                >
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://play.google.com/store/apps/details?id=cris.org.in.prs.ima"
                    alt="QR Code"
                    className="w-20 h-20 opacity-80"
                  />
                </a>
                <p className="text-irctc-blue font-bold text-[10px] mt-1">Scan to download</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
