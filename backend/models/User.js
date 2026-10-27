const mongoose = require('mongoose');

if (mongoose.models && mongoose.models.User) {
    delete mongoose.models.User;
}

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String },
    walletBalance: { type: Number, default: 5000.00 }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('User', userSchema);
