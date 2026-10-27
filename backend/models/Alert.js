const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    title: { type: String, default: 'IRCTC Advisory' },
    message: { type: String, required: true },
    type: { type: String, default: 'info' }, // info, warning, critical, success
    active: { type: Boolean, default: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);