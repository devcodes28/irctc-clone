const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Mappings
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trains', require('./routes/trainRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB Atlas!'))
    .catch((error) => console.error('❌ MongoDB connection failed:', error));

// Test Route
app.get('/api/status', (req, res) => {
    res.json({ message: "IRCTC Backend Engine is live!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});