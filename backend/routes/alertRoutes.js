const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// GET: Fetch all alerts (broadcast and system alerts)
router.get('/', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: Fetch all alerts for a specific user (including admin broadcasts)
router.get('/user/:userId', async (req, res) => {
    try {
        const alerts = await Alert.find({
            $or: [
                { userId: req.params.userId },
                { userId: null },
                { userId: { $exists: false } }
            ]
        }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// POST: Create an alert
router.post('/', async (req, res) => {
    try {
        const { title, message, type, userId } = req.body;
        if (!message) return res.status(400).json({ success: false, message: "Message is required." });

        const newAlert = new Alert({
            title: title || 'IRCTC Advisory',
            message,
            type: type || 'info',
            userId: userId || null
        });
        await newAlert.save();
        res.status(201).json({ success: true, message: "Alert saved successfully.", alert: newAlert });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;