// Ensure API_BASE_URL is safely declared only once
if (typeof API_BASE_URL === 'undefined') {
    var API_BASE_URL = 'http://localhost:5000/api';
}

// Ensure DB_API is defined once globally
window.DB_API = window.DB_API || {

    // --- USER AUTHENTICATION ---
    registerUser: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return await response.json(); 
        } catch (error) {
            console.error("Network Error:", error);
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
            
            const data = await response.json();
            if (response.ok && data.success) {
                localStorage.setItem('current_user_id', data.user._id || data.user.id);
                localStorage.setItem('current_user_name', data.user.fullName);
                localStorage.setItem('current_user', JSON.stringify(data.user));
            }
            return data;
        } catch (error) {
            console.error("Network Error:", error);
            return { success: false, message: "Server connection failed." };
        }
    },

    getCurrentUserId: () => localStorage.getItem('current_user_id'),

    getCurrentUser: () => {
        const userStr = localStorage.getItem('current_user');
        if (userStr) {
            try { 
                const user = JSON.parse(userStr);
                if (user.walletBalance === undefined || isNaN(user.walletBalance)) {
                    user.walletBalance = 5000.00;
                }
                return user; 
            } catch (e) {}
        }
        const id = localStorage.getItem('current_user_id');
        const name = localStorage.getItem('current_user_name');
        if (id) {
            return { id, _id: id, fullName: name || 'User', walletBalance: 5000.00, email: '', mobile: '' };
        }
        return null;
    },

    logoutUser: () => {
        localStorage.removeItem('current_user_id');
        localStorage.removeItem('current_user_name');
        localStorage.removeItem('current_user');
        window.location.href = 'login.html';
    },

    // --- TRAIN QUERIES ---
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
            console.error("API Error fetching PNR, checking local fallback:", error);
        }

        const currentUser = DB_API.getCurrentUser();
        if (currentUser) {
            try {
                const bookingsRes = await fetch(`${API_BASE_URL}/bookings/user/${currentUser._id || currentUser.id}`);
                const bookingsData = await bookingsRes.json();
                if (bookingsData.success && bookingsData.bookings) {
                    return bookingsData.bookings.find(b => b.pnr === pnr) || null;
                }
            } catch (e) {}
        }
        return null;
    },

    saveBooking: async (newBooking, userId, paymentMode) => {
        try {
            const validUserId = userId || DB_API.getCurrentUserId();
            const mode = paymentMode || 'E-Wallet';

            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newBooking, userId: validUserId, paymentMode: mode })
            });
            const data = await response.json();

            // Fetch fresh profile from MongoDB to immediately sync the exact wallet deduction
            if (data.success && validUserId) {
                try {
                    const userRes = await fetch(`${API_BASE_URL}/users/${validUserId}`);
                    const userData = await userRes.json();
                    if (userData.success && userData.user) {
                        localStorage.setItem('current_user', JSON.stringify(userData.user));
                    }
                } catch (err) {
                    console.error("Failed to sync updated wallet balance:", err);
                }
            }

            return data;
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

    // --- E-WALLET & USER UPDATES ---
    addWalletFunds: async (userId, amount) => {
        try {
            const user = DB_API.getCurrentUser();
            const validUserId = userId || user?._id || user?.id;
            
            if (!validUserId) {
                return { success: false, message: "User ID not found. Please log in again." };
            }

            const newBalance = (user.walletBalance || 0) + amount;
            
            const response = await fetch(`${API_BASE_URL}/users/profile/${validUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletBalance: newBalance })
            });
            const data = await response.json();
            
            if (data.success) {
                user.walletBalance = newBalance;
                localStorage.setItem('current_user', JSON.stringify(user));
                return { success: true, newBalance };
            }
            return { success: false, message: data.message || "Failed to update wallet." };
        } catch (error) {
            console.error("Error adding wallet funds:", error);
            return { success: false, message: "Network error." };
        }
    },

    updateProfile: async (userId, profileData) => {
        try {
            const user = DB_API.getCurrentUser();
            const validUserId = userId || user?._id || user?.id;

            const response = await fetch(`${API_BASE_URL}/users/profile/${validUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });
            const data = await response.json();
            if (data.success) {
                Object.assign(user, profileData);
                localStorage.setItem('current_user', JSON.stringify(user));
            }
            return data;
        } catch (error) {
            console.error("Error updating profile:", error);
            return { success: false, message: "Network error." };
        }
    },

    getRecentBooking: async (userId) => {
        try {
            const bookings = await DB_API.getUserBookings(userId);
            if (bookings && bookings.length > 0) {
                const activeBookings = bookings.filter(b => b.bookingStatus !== "Cancelled");
                return activeBookings.length > 0 ? activeBookings[0] : null;
            }
            return null;
        } catch (error) {
            console.error("Error fetching recent booking:", error);
            return null;
        }
    },

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
    }
};

// --- GLOBAL NAVBAR STATE MANAGER ---
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('current_user_id') !== null;

    if (isLoggedIn) {
        const ewalletLink = document.getElementById('navEwallet');
        if (ewalletLink) {
            ewalletLink.classList.remove('hidden');
            ewalletLink.classList.add('flex');
        }

        const dashboardLink = document.getElementById('navDashboard');
        if (dashboardLink) {
            dashboardLink.classList.remove('hidden');
            dashboardLink.classList.add('flex');
        }

        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.textContent.includes('Login')) {
                btn.textContent = 'Logout';
                btn.classList.remove('bg-irctc-orange', 'hover:bg-orange-600');
                btn.classList.add('bg-red-500', 'hover:bg-red-600');
                
                btn.onclick = (e) => {
                    e.preventDefault();
                    DB_API.logoutUser();
                };
            }
        });
    }
});