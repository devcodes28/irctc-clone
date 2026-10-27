/**
 * Centralized API Service for IRCTC Clone
 * Demonstrates:
 * - PPT Slide 5 & 71-72: Fetch API and asynchronous data handling
 * - Clean RESTful endpoint consumption
 */

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // --- USER AUTHENTICATION & PROFILE ---
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      console.error("Network Error during registration:", error);
      return { success: false, message: "Server connection failed." };
    }
  },

  loginUser: async (loginId, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password })
      });
      return await response.json();
    } catch (error) {
      console.error("Network Error during login:", error);
      return { success: false, message: "Server connection failed." };
    }
  },

  getUserProfile: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return { success: false, message: "Failed to fetch profile." };
    }
  },

  updateProfile: async (userId, profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: "Network error." };
    }
  },

  // --- TRAINS & STATIONS ---
  searchTrains: async (origin, destination) => {
    try {
      const response = await fetch(`${API_BASE_URL}/trains/search?origin=${origin}&destination=${destination}`);
      const data = await response.json();
      return data.success ? data.trains : [];
    } catch (error) {
      console.error("Error fetching trains:", error);
      return [];
    }
  },

  getTrainDetails: async (trainNumber) => {
    try {
      if (trainNumber && trainNumber.startsWith('HOLIDAY')) {
        return {
          trainNumber: trainNumber,
          trainName: "IRCTC Holiday Tour Package",
          originCode: "START",
          originName: "Tour Origin",
          destinationCode: "DEST",
          destinationName: "Destination Resort",
          departureTime: "06:00 AM",
          arrivalTime: "08:00 PM",
          availableClasses: [{ classType: "PKG", baseFare: 5000, availableSeats: 50 }]
        };
      }
      const response = await fetch(`${API_BASE_URL}/trains/${trainNumber}`);
      const data = await response.json();
      return data.success ? data.train : null;
    } catch (error) {
      console.error("Error fetching train details:", error);
      return null;
    }
  },

  getStations: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/trains/stations`);
      const data = await response.json();
      return data.success ? data.stations : [];
    } catch (error) {
      console.error("Error fetching stations:", error);
      return [];
    }
  },

  getAllTrains: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/trains`);
      const data = await response.json();
      return data.success ? data.trains : [];
    } catch (error) {
      console.error("Error fetching all trains:", error);
      return [];
    }
  },

  // --- BOOKINGS ---
  getUserBookings: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`);
      const data = await response.json();
      return data.success ? data.bookings : [];
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return [];
    }
  },

  getBookingByPNR: async (pnr) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${pnr}`);
      const data = await response.json();
      if (data.success && data.booking) {
        return data.booking;
      }
    } catch (error) {
      console.error("API Error fetching PNR:", error);
    }
    return null;
  },

  saveBooking: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error saving booking:", error);
      return { success: false, message: "Network error while booking." };
    }
  },

  cancelBooking: async (pnrNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/cancel/${pnrNumber}`, {
        method: 'PATCH'
      });
      return await response.json();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      return { success: false, message: "Network error during cancellation." };
    }
  },

  // --- ALERTS & CONTACT ---
  getUserAlerts: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/user/${userId}`);
      const data = await response.json();
      return data.success ? data.alerts : [];
    } catch (error) {
      console.error("Error fetching alerts:", error);
      return [];
    }
  },

  submitContactMessage: async (messageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });
      return await response.json();
    } catch (error) {
      console.error("Network error submitting contact message:", error);
      return { success: false, message: "Network error while submitting message." };
    }
  },

  // --- ADMIN API ---
  getAdminStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      return { success: false };
    }
  },

  getAdminUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching admin users:", error);
      return { success: false, users: [] };
    }
  },

  addTrain: async (trainData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/trains`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding train:", error);
      return { success: false, message: "Failed to add train." };
    }
  },

  deleteTrain: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/trains/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting train:", error);
      return { success: false, message: "Failed to delete train." };
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting user:", error);
      return { success: false, message: "Failed to delete user." };
    }
  },

  // Alias kept for backward compat
  broadcastAlert: async (alertData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error broadcasting alert:", error);
      return { success: false, message: "Failed to broadcast alert." };
    }
  },

  getAllBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/bookings`);
      const data = await response.json();
      return data.success ? data.bookings : [];
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      return [];
    }
  },

  createBroadcastAlert: async (alertData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error broadcasting alert:", error);
      return { success: false, message: "Failed to broadcast alert." };
    }
  }
};
