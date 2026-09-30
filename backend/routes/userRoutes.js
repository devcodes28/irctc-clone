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

        // Create and save the new user with default wallet balance
        const newUser = new User({ fullName, email, mobile, password, walletBalance: 5000.00 });
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

        // Send back user data including wallet balance for localStorage
        res.status(200).json({ 
            success: true, 
            message: "Login successful!",
            user: { 
                _id: user._id, 
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                walletBalance: user.walletBalance ?? 5000.00 
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: /api/users/:id (Fetch latest user details and live wallet balance)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ 
            success: true, 
            user: { 
                _id: user._id, 
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                walletBalance: user.walletBalance ?? 5000.00 
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