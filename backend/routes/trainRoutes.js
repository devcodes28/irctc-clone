const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define a Train Schema so Mongoose knows the structure
const trainSchema = new mongoose.Schema({
    trainNumber: { type: String, required: true, unique: true },
    trainName: { type: String, required: true },
    originCode: { type: String, required: true },
    originName: { type: String, required: true },
    destinationCode: { type: String, required: true },
    destinationName: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    availableClasses: [{
        classType: String,
        baseFare: Number,
        availableSeats: Number
    }]
});

const Train = mongoose.model('Train', trainSchema);

// GET: /api/trains/search?origin=TVC&destination=NDLS
router.get('/search', async (req, res) => {
    try {
        const { origin, destination } = req.query;
        let query = {};
        if (origin) query.originCode = origin.toUpperCase();
        if (destination) query.destinationCode = destination.toUpperCase();

        const trains = await Train.find(query);
        res.status(200).json({ success: true, trains });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: /api/trains/:trainNumber
router.get('/:trainNumber', async (req, res) => {
    try {
        const train = await Train.findOne({ trainNumber: req.params.trainNumber });
        if (!train) return res.status(404).json({ success: false, message: "Train not found" });
        res.status(200).json({ success: true, train });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: /api/trains/stations (Fetches unique origin/destination stations)
router.get('/stations', async (req, res) => {
    try {
        const trains = await Train.find({});
        const stationMap = new Map();

        trains.forEach(train => {
            if (train.originCode && train.originName) {
                stationMap.set(train.originCode, train.originName);
            }
            if (train.destinationCode && train.destinationName) {
                stationMap.set(train.destinationCode, train.destinationName);
            }
        });

        const stations = Array.from(stationMap, ([code, name]) => ({ code, name }));
        res.status(200).json({ success: true, stations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});
module.exports = router;