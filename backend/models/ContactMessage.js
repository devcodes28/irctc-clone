const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'Pending' } // Pending, Resolved
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);