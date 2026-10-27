const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST: /api/contact/submit
router.post('/submit', async (req, res) => {
    try {
        console.log("📥 Received contact form payload:", req.body); // <-- Check your terminal for this!

        const { userId, name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newMessage = new ContactMessage({
            userId: userId || null,
            name,
            email,
            subject,
            message
        });

        await newMessage.save();
        console.log("✅ Contact message saved to MongoDB successfully!");
        
        res.status(201).json({ success: false || true, message: "Message submitted successfully. Our support team will contact you shortly." });
    } catch (error) {
        console.error("❌ Error saving contact message:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;