const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNumber: { type: String, required: true, unique: true },
    trainName: { type: String, required: true },
    originCode: { type: String, required: true },
    originName: { type: String, required: true },
    destinationCode: { type: String, required: true },
    destinationName: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    availableClasses: [{
        classType: String,
        baseFare: Number,
        availableSeats: Number
    }]
});

module.exports = mongoose.models.Train || mongoose.model('Train', trainSchema);
