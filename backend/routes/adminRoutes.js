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
        
        let totalRevenue = 0;
        if (Booking) {
            const bookings = await Booking.find({}, 'fareDetails.totalFare fare totalAmount').lean();
            bookings.forEach(b => {
                totalRevenue += (b.fareDetails?.totalFare || b.fare || b.totalAmount || 0);
            });
        }

        res.status(200).json({
            success: true,
            totalUsers: userCount,
            totalTrains: trainCount,
            totalBookings: bookingCount,
            totalRevenue,
            stats: {
                trains: trainCount,
                users: userCount,
                bookings: bookingCount,
                totalRevenue
            }
        });
    } catch (error) {
        console.error("GET /stats Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET: /api/admin/bookings - Fetch live bookings for ledger
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50).lean();
        res.status(200).json({ success: true, count: bookings.length, bookings });
    } catch (error) {
        console.error("GET /admin/bookings Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/analytics', async (req, res) => {
    try {
        const bookings = Booking ? await Booking.find().lean() : [];
        let totalRevenue = 0;
        const classCounts = { SL: 0, '3A': 0, '2A': 0, '1A': 0 };

        bookings.forEach(b => {
            totalRevenue += b.fare || b.totalAmount || (b.fareDetails && b.fareDetails.totalFare) || 500;
            if (b.classType && classCounts[b.classType] !== undefined) {
                classCounts[b.classType]++;
            } else {
                classCounts['3A']++;
            }
        });

        const recentBookings = Booking ? await Booking.find().sort({ createdAt: -1 }).limit(5).lean() : [];

        res.status(200).json({
            success: true,
            analytics: {
                totalRevenue,
                classDistribution: [classCounts['SL'], classCounts['3A'], classCounts['2A'], classCounts['1A']],
                recentBookings
            }
        });
    } catch (error) {
        console.error("GET /analytics Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==========================================
// 2. MANAGE TRAINS ROUTES
// ==========================================
router.get('/trains', async (req, res) => {
    try {
        const rawTrains = await Train.find().sort({ trainNumber: 1 }).lean();
        const trains = rawTrains.map(t => {
            t.originCode = t.originCode || t.sourceStation?.code || '';
            t.originName = t.originName || t.sourceStation?.name || '';
            t.destinationCode = t.destinationCode || t.destinationStation?.code || '';
            t.destinationName = t.destinationName || t.destinationStation?.name || '';
            if ((!t.availableClasses || t.availableClasses.length === 0) && t.classes && t.classes.length > 0) {
                t.availableClasses = t.classes.map(c => ({
                    classType: c.classType,
                    baseFare: c.baseFare,
                    availableSeats: c.availableSeats !== undefined ? c.availableSeats : (c.totalSeats || 50)
                }));
            }
            return t;
        });
        res.status(200).json({ success: true, trains });
    } catch (error) {
        console.error("GET /trains Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/trains', async (req, res) => {
    try {
        const { trainNumber, trainName, departureTime, arrivalTime, fare, totalSeats } = req.body;
        const originCode = (req.body.originCode || req.body.origin || '').toUpperCase();
        const originName = req.body.originName || req.body.origin || originCode;
        const destinationCode = (req.body.destinationCode || req.body.destination || '').toUpperCase();
        const destinationName = req.body.destinationName || req.body.destination || destinationCode;

        if (!trainNumber || !trainName || !originCode || !destinationCode) {
            return res.status(400).json({ success: false, message: "Train number, name, origin, and destination are required." });
        }

        const existing = await Train.findOne({ trainNumber });
        if (existing) return res.status(400).json({ success: false, message: `Train ${trainNumber} already exists.` });

        const baseFare = Number(fare) || 450;
        const seats = Number(totalSeats) || 120;

        const newTrain = new Train({
            trainNumber,
            trainName,
            originCode,
            originName: originName || originCode,
            destinationCode,
            destinationName: destinationName || destinationCode,
            sourceStation: { code: originCode, name: originName || originCode },
            destinationStation: { code: destinationCode, name: destinationName || destinationCode },
            departureTime: departureTime || '06:00 AM',
            arrivalTime: arrivalTime || '02:00 PM',
            availableClasses: [
                { classType: "SL", baseFare: baseFare, availableSeats: seats },
                { classType: "3A", baseFare: Math.round(baseFare * 2.5), availableSeats: Math.round(seats * 0.4) },
                { classType: "2A", baseFare: Math.round(baseFare * 4), availableSeats: Math.round(seats * 0.2) }
            ]
        });
        await newTrain.save();
        res.status(201).json({ success: true, message: "Train created successfully.", train: newTrain });
    } catch (error) {
        console.error("POST /trains Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/trains/:id', async (req, res) => {
    try {
        await Train.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Train deleted." });
    } catch (error) {
        console.error("DELETE /trains Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==========================================
// 3. MANAGE USERS ROUTES
// ==========================================
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("GET /users Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User deleted." });
    } catch (error) {
        console.error("DELETE /users Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==========================================
// 4. BROADCAST ALERTS ROUTES
// ==========================================
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({ success: true, alerts });
    } catch (error) {
        console.error("GET /alerts Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/alerts', async (req, res) => {
    try {
        const { message, type, title, userId } = req.body;
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
            userId: userId || null
        });
        await newAlert.save();
        res.status(201).json({ success: true, message: "Alert broadcasted successfully.", alert: newAlert });
    } catch (error) {
        console.error("POST /alerts Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/alerts/:id', async (req, res) => {
    try {
        await Alert.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Alert deleted." });
    } catch (error) {
        console.error("DELETE /alerts Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
