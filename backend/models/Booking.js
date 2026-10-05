const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    pnr: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    trainNumber: { type: String, required: true },
    travelDate: { type: String, required: true },
    passengers: [{
        name: String,
        age: Number,
        gender: String,
        berthPreference: String,
        status: String,
        coach: String,
        berth: Number
    }],
    fareDetails: {
        totalFare: { type: Number, default: 0 }
    },
    classType: { type: String, default: 'SL' },
    bookingStatus: { type: String, default: 'Confirmed' }
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
