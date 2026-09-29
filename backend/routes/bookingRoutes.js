const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    pnr: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainNumber: { type: String, required: true },
    travelDate: { type: String, required: true },
    passengers: [{
        name: String,
        age: Number,
        gender: String,
        berthPreference: String,
        status: String,
        coach: String,
        berth: Number
    }],
    fareDetails: { totalFare: Number },
    bookingStatus: { type: String, default: "Confirmed" }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

// POST: /api/bookings - Save a new booking
router.post('/', async (req, res) => {
    try {
        const { userId, trainNumber, travelDate, passengers, fareDetails } = req.body;
        const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        const newBooking = new Booking({
            pnr,
            userId,
            trainNumber,
            travelDate,
            passengers,
            fareDetails,
            bookingStatus: "Confirmed"
        });

        await newBooking.save();
        res.status(201).json({ success: true, booking: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: /api/bookings/user/:userId - Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// PATCH: /api/bookings/cancel/:pnr - Cancel ticket
router.patch('/cancel/:pnr', async (req, res) => {
    try {
        const booking = await Booking.findOne({ pnr: req.params.pnr });
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        if (booking.bookingStatus === "Cancelled") return res.status(400).json({ success: false, message: "Already cancelled" });

        booking.bookingStatus = "Cancelled";
        booking.passengers.forEach(p => p.status = "CAN");
        await booking.save();

        res.status(200).json({ success: true, message: "Booking cancelled successfully", booking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// PUT: Update user profile or wallet balance
router.put('/profile/:id', async (req, res) => {
    try {
        const { email, mobile, walletBalance } = req.body;
        const updateData = {};
        if (email) updateData.email = email;
        if (mobile) updateData.mobile = mobile;
        if (walletBalance !== undefined) updateData.walletBalance = walletBalance;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

router.get('/:pnr', async (req, res) => {
    try {
        const booking = await Booking.findOne({ pnr: req.params.pnr });
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }
        res.status(200).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;