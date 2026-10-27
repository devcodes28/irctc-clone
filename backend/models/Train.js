const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNumber: { type: String, required: true },
    trainName: { type: String, required: true },
    originCode: { type: String },
    originName: { type: String },
    destinationCode: { type: String },
    destinationName: { type: String },
    sourceStation: {
        code: String,
        name: String
    },
    destinationStation: {
        code: String,
        name: String
    },
    departureTime: { type: String },
    arrivalTime: { type: String },
    availableClasses: [{
        classType: String,
        baseFare: Number,
        availableSeats: Number
    }],
    classes: [{
        classType: String,
        baseFare: Number,
        totalSeats: Number,
        availableSeats: Number
    }]
}, { strict: false });

module.exports = mongoose.models.Train || mongoose.model('Train', trainSchema);
