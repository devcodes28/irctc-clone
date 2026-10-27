const mongoose = require('mongoose');

// Delete existing model from mongoose cache if present to guarantee schema updates apply
if (mongoose.models && mongoose.models.Booking) {
    delete mongoose.models.Booking;
}

const bookingSchema = new mongoose.Schema({
    pnr: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    trainNumber: { type: String, required: true },
    travelDate: { type: String, required: true },
    passengers: [{
        name: { type: String },
        age: { type: Number },
        gender: { type: String },
        berthPreference: { type: String },
        status: { type: String },
        coach: { type: String },
        berth: { type: mongoose.Schema.Types.Mixed }
    }],
    fareDetails: {
        totalFare: { type: Number, default: 0 }
    },
    classType: { type: String, default: 'SL' },
    bookingStatus: { type: String, default: 'Confirmed' }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Booking', bookingSchema);
