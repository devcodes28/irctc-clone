const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

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

// GET: /api/trains/stations (MOVED THIS UP)
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

// GET: /api/trains/:trainNumber (MOVED THIS DOWN so it acts as a fallback)
router.get('/:trainNumber', async (req, res) => {
    try {
        const train = await Train.findOne({ trainNumber: req.params.trainNumber });
        if (!train) return res.status(404).json({ success: false, message: "Train not found" });
        res.status(200).json({ success: true, train });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;