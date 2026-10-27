const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const Station = require('../models/Station');

// Helper to normalize train object across both schema formats
function formatTrain(trainObj) {
    trainObj.originCode = trainObj.originCode || trainObj.sourceStation?.code || '';
    trainObj.originName = trainObj.originName || trainObj.sourceStation?.name || '';
    trainObj.destinationCode = trainObj.destinationCode || trainObj.destinationStation?.code || '';
    trainObj.destinationName = trainObj.destinationName || trainObj.destinationStation?.name || '';
    
    if ((!trainObj.availableClasses || trainObj.availableClasses.length === 0) && trainObj.classes && trainObj.classes.length > 0) {
        trainObj.availableClasses = trainObj.classes.map(c => ({
            classType: c.classType,
            baseFare: c.baseFare,
            availableSeats: c.availableSeats !== undefined ? c.availableSeats : (c.totalSeats || 50)
        }));
    }
    return trainObj;
}

// Checks if a train serves a given route (direct or via intermediate stops)
function trainServesRoute(train, origin, destination) {
    const oCode = (train.originCode || train.sourceStation?.code || '').toUpperCase();
    const dCode = (train.destinationCode || train.destinationStation?.code || '').toUpperCase();
    const org = origin.toUpperCase();
    const dest = destination.toUpperCase();

    // 1. Direct match: Origin is source and Destination is destination
    if (oCode === org && dCode === dest) return true;

    // 2. Intermediate route stops matching
    const route = Array.isArray(train.route) ? train.route : [];
    if (route.length > 0) {
        const stationSeq = [];
        if (oCode) stationSeq.push(oCode);
        route.forEach(r => {
            const sc = (r.stationCode || '').toUpperCase();
            if (sc && !stationSeq.includes(sc)) stationSeq.push(sc);
        });
        if (dCode && !stationSeq.includes(dCode)) stationSeq.push(dCode);

        const oIdx = stationSeq.indexOf(org);
        const dIdx = stationSeq.indexOf(dest);

        if (oIdx !== -1 && dIdx !== -1 && oIdx < dIdx) {
            return true;
        }
    }

    return false;
}

// GET: /api/trains/stations - Fetches directly from the MongoDB 'stations' collection
router.get('/stations', async (req, res) => {
    try {
        // 1. Primary: Query the dedicated 'stations' collection in MongoDB Atlas
        let stations = await Station.find({}, 'code name city state').lean();

        // 2. Secondary fallback: Extract unique stations from trains if stations collection is empty
        if (!stations || stations.length === 0) {
            const trains = await Train.find({}).lean();
            const stationMap = new Map();
            trains.forEach(train => {
                const oCode = train.originCode || train.sourceStation?.code;
                const oName = train.originName || train.sourceStation?.name;
                const dCode = train.destinationCode || train.destinationStation?.code;
                const dName = train.destinationName || train.destinationStation?.name;
                if (oCode && oName) stationMap.set(oCode, oName);
                if (dCode && dName) stationMap.set(dCode, dName);
            });
            stations = Array.from(stationMap, ([code, name]) => ({ code, name }));
        }

        // Sort alphabetically by station name
        const sortedStations = stations.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json({ success: true, count: sortedStations.length, stations: sortedStations });
    } catch (error) {
        console.error("Error fetching stations from database:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: /api/trains/search?origin=BCT&destination=NDLS
router.get('/search', async (req, res) => {
    try {
        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({ success: false, message: "Origin and destination are required." });
        }

        const allRawTrains = await Train.find({}).lean();
        const matchingTrains = allRawTrains
            .filter(t => trainServesRoute(t, origin, destination))
            .map(formatTrain);

        res.status(200).json({ success: true, count: matchingTrains.length, trains: matchingTrains });
    } catch (error) {
        console.error("Error in train search:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: /api/trains/:trainNumber
router.get('/:trainNumber', async (req, res) => {
    try {
        const rawTrain = await Train.findOne({ trainNumber: req.params.trainNumber }).lean();
        if (!rawTrain) return res.status(404).json({ success: false, message: "Train not found" });
        const train = formatTrain(rawTrain);
        res.status(200).json({ success: true, train });
    } catch (error) {
        console.error("Error fetching train details:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
