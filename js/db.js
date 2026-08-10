const initialData = {
    users: [
        { id: "user_admin", fullName: "System Administrator", email: "admin@irctc.co.in", mobile: "9999999999", password: "admin123", role: "admin", walletBalance: 99999.00, createdAt: "2026-08-10T10:00:00Z" },
        { id: "user_001", fullName: "Sreedev Suresh", email: "sreedev@example.com", mobile: "9876543210", password: "password123", walletBalance: 4500.00, createdAt: "2026-08-10T10:00:00Z" },
        { id: "user_002", fullName: "Sreya Maxwel", email: "sreya@example.com", mobile: "9876543211", password: "password123", walletBalance: 3200.00, createdAt: "2026-08-10T10:00:00Z" },
        { id: "user_003", fullName: "John Doe", email: "john@example.com", mobile: "9876543212", password: "password123", walletBalance: 1500.00, createdAt: "2026-08-10T10:00:00Z" },
        { id: "user_004", fullName: "Jane Smith", email: "jane@example.com", mobile: "9876543213", password: "password123", walletBalance: 800.00, createdAt: "2026-08-10T10:00:00Z" },
        { id: "user_005", fullName: "Rahul Kumar", email: "rahul@example.com", mobile: "9876543214", password: "password123", walletBalance: 5500.00, createdAt: "2026-08-10T10:00:00Z" }
    ],
    trains: [
        { trainNumber: "12625", trainName: "KERALA EXPRESS", originCode: "TVC", originName: "Trivandrum", destinationCode: "NDLS", destinationName: "New Delhi", departureTime: "11:15", arrivalTime: "15:00", availableClasses: [{ classType: "SL", baseFare: 650, availableSeats: 120 }, { classType: "3A", baseFare: 1750, availableSeats: 45 }] },
        { trainNumber: "12431", trainName: "RAJDHANI EXP", originCode: "TVC", originName: "Trivandrum", destinationCode: "NZM", destinationName: "Nizamuddin", departureTime: "19:15", arrivalTime: "12:40", availableClasses: [{ classType: "3A", baseFare: 2200, availableSeats: 15 }, { classType: "2A", baseFare: 3100, availableSeats: 8 }] },
        { trainNumber: "12028", trainName: "SHATABDI EXP", originCode: "SBC", originName: "Bengaluru", destinationCode: "MAS", destinationName: "Chennai", departureTime: "06:00", arrivalTime: "11:00", availableClasses: [{ classType: "CC", baseFare: 950, availableSeats: 40 }, { classType: "EC", baseFare: 1850, availableSeats: 10 }] },
        { trainNumber: "12696", trainName: "TRIVANDRUM MAIL", originCode: "TVC", originName: "Trivandrum", destinationCode: "MAS", destinationName: "Chennai", departureTime: "17:20", arrivalTime: "10:00", availableClasses: [{ classType: "SL", baseFare: 450, availableSeats: 200 }, { classType: "3A", baseFare: 1250, availableSeats: 60 }] },
        { trainNumber: "22436", trainName: "VANDE BHARAT", originCode: "NDLS", originName: "New Delhi", destinationCode: "BSB", destinationName: "Varanasi", departureTime: "06:00", arrivalTime: "14:00", availableClasses: [{ classType: "CC", baseFare: 1750, availableSeats: 110 }, { classType: "EC", baseFare: 3300, availableSeats: 25 }] }
    ],
    bookings: [
        { pnr: "8493028491", trainNumber: "12625", travelDate: "2026-08-15", passengers: [{ name: "Sreedev Suresh", age: 21, gender: "Male", berthPreference: "Lower", status: "CNF", coach: "B4", berth: 32 }], fareDetails: { totalFare: 700.40 }, bookingStatus: "Confirmed" },
        { pnr: "8493028492", trainNumber: "12431", travelDate: "2026-08-16", passengers: [{ name: "Sreya Maxwel", age: 21, gender: "Female", berthPreference: "Upper", status: "CNF", coach: "A2", berth: 15 }], fareDetails: { totalFare: 3150.00 }, bookingStatus: "Confirmed" },
        { pnr: "8493028493", trainNumber: "12028", travelDate: "2026-08-17", passengers: [{ name: "John Doe", age: 35, gender: "Male", berthPreference: "Window", status: "CNF", coach: "C1", berth: 44 }], fareDetails: { totalFare: 1000.00 }, bookingStatus: "Confirmed" },
        { pnr: "8493028494", trainNumber: "12696", travelDate: "2026-08-18", passengers: [{ name: "Jane Smith", age: 28, gender: "Female", berthPreference: "Lower", status: "CNF", coach: "S5", berth: 12 }], fareDetails: { totalFare: 500.00 }, bookingStatus: "Confirmed" },
        { pnr: "8493028495", trainNumber: "22436", travelDate: "2026-08-19", passengers: [{ name: "Rahul Kumar", age: 42, gender: "Male", berthPreference: "Aisle", status: "CNF", coach: "E1", berth: 5 }], fareDetails: { totalFare: 3350.00 }, bookingStatus: "Confirmed" }
    ]
};

if (!localStorage.getItem('irctc_db')) {
    localStorage.setItem('irctc_db', JSON.stringify(initialData));
}

const DB_API = {
    getAll: () => JSON.parse(localStorage.getItem('irctc_db')),
    getUser: (userId) => {
        const db = DB_API.getAll();
        return db.users.find(u => u.id === userId);
    },
    
    // RESTRICTED REGISTRATION
    registerUser: (userData) => {
        const db = DB_API.getAll();
        const allowedEmails = ["sreedev@example.com", "sreya@example.com", "john@example.com", "jane@example.com", "rahul@example.com"];
        
        if (!allowedEmails.includes(userData.email.toLowerCase())) {
            return { success: false, message: "Registration is restricted to authorized beta users only." };
        }

        const userExists = db.users.some(u => u.email === userData.email || u.mobile === userData.mobile);
        if (userExists) return { success: false, message: "User with this email already exists! Please login." };

        const newUser = {
            id: "user_" + Date.now(),
            fullName: userData.fullName,
            email: userData.email,
            mobile: userData.mobile,
            password: userData.password, 
            walletBalance: 1000.00,
            createdAt: new Date().toISOString()
        };
        db.users.push(newUser);
        localStorage.setItem('irctc_db', JSON.stringify(db));
        return { success: true, user: newUser };
    },

    loginUser: (loginId, password) => {
        const db = DB_API.getAll();
        const user = db.users.find(u => (u.email.toLowerCase() === loginId.toLowerCase() || u.mobile === loginId) && u.password === password);
        if (user) {
            localStorage.setItem('current_user_id', user.id);
            return { success: true, user: user };
        } else {
            return { success: false, message: "Invalid email/mobile or password!" };
        }
    },
    getCurrentUser: () => {
        const userId = localStorage.getItem('current_user_id');
        if (!userId) return null;
        return DB_API.getUser(userId) || null;
    },
    logoutUser: () => {
        localStorage.removeItem('current_user_id');
        window.location.href = 'login.html';
    },
    getRecentBooking: (userName) => {
        const db = DB_API.getAll();
        return db.bookings.find(b => b.passengers.some(p => p.name === userName));
    },
    getTrainDetails: (trainNumber) => {
        const db = DB_API.getAll();
        return db.trains.find(t => t.trainNumber === trainNumber);
    },
    
    // --- ADDITIONS FOR BOOKINGS, CANCEL & E-WALLET ---

    // 1. Get ALL bookings for a specific user
    getUserBookings: (userName) => {
        const db = DB_API.getAll();
        // Filter returns an array of all matching bookings, sorted newest first
        return db.bookings
            .filter(b => b.passengers.some(p => p.name === userName))
            .sort((a, b) => new Date(b.travelDate) - new Date(a.travelDate)); 
    },

    // 2. Get a booking by PNR (For PNR Status Page)
    getBookingByPNR: (pnrNumber) => {
        const db = DB_API.getAll();
        return db.bookings.find(b => b.pnr === pnrNumber) || null;
    },

    // 3. Cancel a booking and refund the E-Wallet
    cancelBooking: (pnrNumber, userId) => {
        const db = DB_API.getAll();
        const booking = db.bookings.find(b => b.pnr === pnrNumber);
        const user = db.users.find(u => u.id === userId);

        if (!booking || !user) return { success: false, message: "Error processing cancellation." };
        if (booking.bookingStatus === "Cancelled") return { success: false, message: "Ticket is already cancelled." };

        // Change status
        booking.bookingStatus = "Cancelled";
        booking.passengers.forEach(p => p.status = "CAN");

        // Refund the wallet
        const refundAmount = booking.fareDetails.totalFare;
        user.walletBalance += refundAmount;

        // Save back to local storage
        localStorage.setItem('irctc_db', JSON.stringify(db));
        
        return { success: true, refundAmount: refundAmount };
    },

    // 4. Top-up E-Wallet
    addWalletFunds: (userId, amount) => {
        const db = DB_API.getAll();
        const user = db.users.find(u => u.id === userId);
        if (user) {
            user.walletBalance += parseFloat(amount);
            localStorage.setItem('irctc_db', JSON.stringify(db));
            return { success: true, newBalance: user.walletBalance };
        }
        return { success: false };
    },

    // 5. Save a Booking and Handle Payment
    saveBooking: (newBooking, userId, paymentMode) => {
        const db = DB_API.getAll();
        const user = db.users.find(u => u.id === userId);
        
        if (!user) return { success: false, message: "User not found." };
        
        const fare = newBooking.fareDetails.totalFare;
        
        // Only check and deduct from wallet if E-Wallet is chosen
        if (paymentMode === 'ewallet') {
            if (user.walletBalance < fare) {
                return { success: false, message: `Insufficient E-Wallet balance. Ticket costs ₹${fare}, but you only have ₹${user.walletBalance.toFixed(2)}.` };
            }
            // Deduct the balance
            user.walletBalance -= fare;
        }
        
        // Save the booking
        db.bookings.push(newBooking);
        localStorage.setItem('irctc_db', JSON.stringify(db));
        
        return { success: true, newBalance: user.walletBalance };
    },

    // --- ADMIN CAPABILITIES ---
    
    // 1. Get all system bookings (for monitoring)
    getAllSystemBookings: () => {
        const db = DB_API.getAll();
        return db.bookings || [];
    },

    // 2. Add or Update a Train
    saveTrain: (trainData) => {
        const db = DB_API.getAll();
        const index = db.trains.findIndex(t => t.trainNumber === trainData.trainNumber);
        
        if (index !== -1) {
            // Update existing train
            db.trains[index] = trainData;
        } else {
            // Add new train
            db.trains.push(trainData);
        }
        localStorage.setItem('irctc_db', JSON.stringify(db));
        return { success: true, message: "Train saved successfully!" };
    },

    // 3. Delete a Train
    deleteTrain: (trainNumber) => {
        const db = DB_API.getAll();
        db.trains = db.trains.filter(t => t.trainNumber !== trainNumber);
        localStorage.setItem('irctc_db', JSON.stringify(db));
        return { success: true, message: "Train deleted successfully!" };
    },

    // 4. Manage Travel Alerts (Broadcast)
    getAlerts: () => {
        const db = DB_API.getAll();
        if (!db.alerts) {
            db.alerts = [
                { id: 1, type: "Cancelled", title: "Train No. 16345 (Netravati Exp) Cancelled", desc: "Due to heavy waterlogging on the tracks near Mangaluru...", date: "Today, 08:30 AM" },
                { id: 2, type: "Rescheduled", title: "Train No. 12625 (Kerala Exp) Delayed", desc: "Train No. 12625 is running late by 2 hours and 30 minutes...", date: "Yesterday, 14:15 PM" }
            ];
            localStorage.setItem('irctc_db', JSON.stringify(db));
        }
        return db.alerts;
    },

    saveAlert: (alertData) => {
        const db = DB_API.getAll();
        if (!db.alerts) db.alerts = [];
        db.alerts.unshift({ id: Date.now(), ...alertData });
        localStorage.setItem('irctc_db', JSON.stringify(db));
        return { success: true, message: "Alert broadcasted successfully!" };
    },

    deleteAlert: (alertId) => {
        const db = DB_API.getAll();
        db.alerts = db.alerts.filter(a => a.id !== alertId);
        localStorage.setItem('irctc_db', JSON.stringify(db));
        return { success: true, message: "Alert removed successfully!" };
    }
};

// --- GLOBAL NAVBAR STATE MANAGER ---
// This runs automatically on every single page that links to db.js
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('current_user_id') !== null;

    if (isLoggedIn) {
        // 1. Unhide E-wallet link on all pages
        const ewalletLink = document.getElementById('navEwallet');
        if (ewalletLink) {
            ewalletLink.classList.remove('hidden');
            ewalletLink.classList.add('flex');
        }

        // 2. Scan the navbar and magically transform "Login" to "Logout"
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.textContent.includes('Login')) {
                btn.textContent = 'Logout';
                
                // Change Tailwind colors to Red
                btn.classList.remove('bg-irctc-orange', 'hover:bg-orange-600');
                btn.classList.add('bg-red-500', 'hover:bg-red-600');
                
                // Override the click event to trigger logout
                btn.onclick = (e) => {
                    e.preventDefault();
                    DB_API.logoutUser();
                };
            }
        });
    }
});