const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Alert = require('../models/Alert');

// ==========================================
// 1. SYSTEM OVERVIEW & ANALYTICS ROUTES
// ==========================================
router.get('/stats', async (req, res) => {
    try {
        const trainCount = await Train.countDocuments();
        const userCount = await User.countDocuments();
        const bookingCount = Booking ? await Booking.countDocuments() : 0;
        res.status(200).json({ success: true, stats: { trains: trainCount, users: userCount, bookings: bookingCount } });
    } catch (error) {
        console.error("❌ /stats Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/analytics', async (req, res) => {
    try {
        const bookings = Booking ? await Booking.find() : [];
        let totalRevenue = 0;
        const classCounts = { SL: 0, '3A': 0, '2A': 0, '1A': 0 };

        bookings.forEach(b => {
            totalRevenue += b.fare || b.totalAmount || 500;
            if (b.classType && classCounts[b.classType] !== undefined) {
                classCounts[b.classType]++;
            } else {
                classCounts['3A']++;
            }
        });

        const recentBookings = Booking ? await Booking.find().sort({ createdAt: -1 }).limit(5) : [];

        res.status(200).json({
            success: true,
            analytics: {
                totalRevenue,
                classDistribution: [classCounts['SL'], classCounts['3A'], classCounts['2A'], classCounts['1A']],
                recentBookings
            }
        });
    } catch (error) {
        console.error("❌ /analytics Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==========================================
// 2. MANAGE TRAINS ROUTES
// ==========================================
router.get('/trains', async (req, res) => {
    try {
        const trains = await Train.find().sort({ trainNumber: 1 });
        res.status(200).json({ success: true, trains });
    } catch (error) {
        console.error("❌ GET /trains Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/trains', async (req, res) => {
    try {
        const { trainNumber, trainName, originCode, originName, destinationCode, destinationName, departureTime, arrivalTime } = req.body;
        const existing = await Train.findOne({ trainNumber });
        if (existing) return res.status(400).json({ success: false, message: `Train ${trainNumber} already exists.` });

        const newTrain = new Train({
            trainNumber, trainName, originCode, originName, destinationCode, destinationName, departureTime, arrivalTime,
            availableClasses: [
                { classType: "SL", baseFare: 450, availableSeats: 120 },
                { classType: "3A", baseFare: 1250, availableSeats: 48 },
                { classType: "2A", baseFare: 1950, availableSeats: 24 }
            ]
        });
        await newTrain.save();
        res.status(201).json({ success: true, message: "Train created.", train: newTrain });
    } catch (error) {
        console.error("❌ POST /trains Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/trains/:id', async (req, res) => {
    try {
        await Train.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Train deleted." });
    } catch (error) {
        console.error("❌ DELETE /trains Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==========================================
// 3. MANAGE USERS ROUTES
// ==========================================
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("❌ GET /users Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User deleted." });
    } catch (error) {
        console.error("❌ DELETE /users Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==========================================
// 4. BROADCAST ALERTS ROUTES
// ==========================================
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, alerts });
    } catch (error) {
        console.error("❌ GET /alerts Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/alerts', async (req, res) => {
    try {
        const { message, type, title } = req.body;
        if (!message) return res.status(400).json({ success: false, message: "Message is required." });

        const typeLabels = {
            info: 'IRCTC Information',
            warning: 'Travel Advisory',
            critical: 'Critical Alert',
            success: 'System Update'
        };

        const newAlert = new Alert({
            title: title || typeLabels[type] || 'Broadcast Notice',
            message,
            type: type || 'info',
            userId: null
        });
        await newAlert.save();
        res.status(201).json({ success: true, message: "Alert broadcasted successfully.", alert: newAlert });
    } catch (error) {
        console.error("❌ POST /alerts Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/alerts/:id', async (req, res) => {
    try {
        await Alert.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Alert deleted." });
    } catch (error) {
        console.error("❌ DELETE /alerts Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;