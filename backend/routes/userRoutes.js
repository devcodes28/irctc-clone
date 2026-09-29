const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST: /api/users/register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, mobile, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        // Create and save the new user
        const newUser = new User({ fullName, email, mobile, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "Account created successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// POST: /api/users/login
router.post('/login', async (req, res) => {
    try {
        const { loginId, password } = req.body;

        // Check if user exists by either email or mobile
        const user = await User.findOne({
            $or: [{ email: loginId }, { mobile: loginId }]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please register." });
        }

        // Verify password 
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }

        // Send back user data for localStorage
        res.status(200).json({ 
            success: true, 
            message: "Login successful!",
            user: { 
                _id: user._id, 
                fullName: user.fullName 
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// PUT: /api/users/profile/:id (Update user profile or wallet balance)
router.put('/profile/:id', async (req, res) => {
    try {
        const { fullName, email, mobile, dob, walletBalance } = req.body;
        const updateData = {};
        
        if (fullName) updateData.fullName = fullName;
        if (email) updateData.email = email;
        if (mobile) updateData.mobile = mobile;
        if (dob) updateData.dob = dob;
        if (walletBalance !== undefined) updateData.walletBalance = walletBalance;

        // FIXED: Replaced { new: true } with { returnDocument: 'after' } to clear the Mongoose warning
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { returnDocument: 'after' });
        
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;