import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrainAnimation from '../TrainAnimation';
import { api } from '../../services/api';

/**
 * ContactUs Page Component (Replicating contact-us.html)
 * Demonstrates:
 * - Controlled form inputs (PPT Slide 86-88)
 * - Asynchronous form submission and feedback handling
 */
function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all the required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.submitContactMessage(formData);
      if (res && res.success) {
        alert("Thank you! Your enquiry has been submitted. Our support team will get back to you shortly.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(res?.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      alert("Network error submitting enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col overflow-x-hidden relative">
      <TrainAnimation />
      <Navbar />

      <main className="w-full relative z-10 px-4 md:px-6 py-6 md:py-10 grow">
        <div className="max-w-250 w-full mx-auto flex flex-col md:flex-row items-start gap-8">
          
          {/* Left Info Panel */}
          <div className="w-full md:w-1/3 space-y-6">
            <div>
              <h2 className="text-2xl font-black text-irctc-blue mb-4">Get in touch</h2>
              <p className="text-sm text-gray-600">
                We are here to assist you with your booking queries, cancellations, and feedback.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2 border-b pb-2">Customer Care Numbers</h3>
              <p className="text-sm text-gray-600 mb-1">For general enquiries:</p>
              <p className="text-xl font-black text-irctc-blue mb-4">139</p>
              
              <p className="text-sm text-gray-600 mb-1">For e-ticketing queries:</p>
              <p className="text-lg font-bold text-gray-900">14646 / 0755-6610661</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2 border-b pb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-1">E-ticketing queries:</p>
              <a href="mailto:care@irctc.co.in" className="text-irctc-orange font-bold text-sm hover:underline">
                care@irctc.co.in
              </a>
              
              <p className="text-sm text-gray-600 mt-3 mb-1">Cancellation queries:</p>
              <a href="mailto:etickets@irctc.co.in" className="text-irctc-orange font-bold text-sm hover:underline">
                etickets@irctc.co.in
              </a>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Write to Us</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Subject / PNR Number</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-irctc-blue hover:bg-blue-900 text-white font-bold py-3 rounded-lg shadow-sm transition-colors mt-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContactUs;
