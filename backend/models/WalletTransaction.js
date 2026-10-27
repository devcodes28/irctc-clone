const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    description: { type: String }
});

module.exports = mongoose.models.WalletTransaction
    || mongoose.model('WalletTransaction', walletTransactionSchema, 'wallets');
