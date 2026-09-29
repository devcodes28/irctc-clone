const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// GET: Fetch all alerts for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const alerts = await Alert.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;