const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    zone: { type: String }
}, { strict: false });

module.exports = mongoose.models.Station || mongoose.model('Station', stationSchema, 'stations');
