import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';

/**
 * ForgotPassword Page Component
 * Demonstrates:
 * - Controlled form inputs with useState (PPT Slide 86-88)
 * - Conditional rendering for success state (PPT Slide 91-93)
 * - Two-panel split layout matching original forgot-password.html
 */
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate a brief delay to mimic network request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-irctc-light flex flex-col">
      <TrainAnimation />
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          {/* Left panel — brand */}
          <div className="bg-irctc-blue text-white flex flex-col items-center justify-center p-10 md:w-2/5">
            <div className="text-5xl mb-4">🚂</div>
            <h1 className="text-3xl font-bold mb-2">IRCTC</h1>
            <p className="text-blue-200 text-center text-sm">
              Indian Railway Catering and Tourism Corporation
            </p>
            <div className="mt-8 border-t border-blue-400 pt-6 w-full text-center">
              <p className="text-blue-200 text-sm">Remembered your password?</p>
              <Link
                to="/login"
                className="mt-2 inline-block text-irctc-orange font-semibold hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>

          {/* Right panel — form or success */}
          <div className="flex-1 flex flex-col justify-center p-10">
            {submitted ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📧</div>
                <h2 className="text-2xl font-bold text-irctc-blue mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. Please check your
                  inbox and follow the instructions.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setEmail(''); }}
                  className="text-irctc-orange hover:underline font-semibold"
                >
                  Try a different email
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-irctc-blue mb-2">Forgot Password?</h2>
                <p className="text-gray-500 mb-6 text-sm">
                  Enter your registered email address. We'll send you instructions to reset your
                  password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-irctc-orange text-white font-semibold py-2.5 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Back to{' '}
                  <Link to="/login" className="text-irctc-blue font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ForgotPassword;
