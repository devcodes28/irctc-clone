const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Train = require('../models/Train');
const Booking = require('../models/Booking');
const WalletTransaction = require('../models/WalletTransaction');

// POST: /api/bookings - Save booking & debit wallet
router.post('/', async (req, res) => {
    try {
        const { userId, trainNumber, travelDate, passengers, fareDetails, fare, totalAmount, paymentMode, classType } = req.body;
        let { trainName, originCode, originName, destinationCode, destinationName, departureTime, arrivalTime } = req.body;

        if (trainNumber && (!originCode || !destinationCode || !trainName)) {
            const foundTrain = await Train.findOne({ trainNumber }).lean();
            if (foundTrain) {
                trainName = trainName || foundTrain.trainName;
                originCode = originCode || foundTrain.originCode || foundTrain.sourceStation?.code;
                originName = originName || foundTrain.originName || foundTrain.sourceStation?.name;
                destinationCode = destinationCode || foundTrain.destinationCode || foundTrain.destinationStation?.code;
                destinationName = destinationName || foundTrain.destinationName || foundTrain.destinationStation?.name;
                departureTime = departureTime || foundTrain.departureTime;
                arrivalTime = arrivalTime || foundTrain.arrivalTime;
            }
        }

        const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const finalFare = fareDetails?.totalFare || fare || totalAmount || 500;

        const isWallet = !paymentMode || 
            paymentMode.toLowerCase() === 'ewallet' || 
            paymentMode.toLowerCase() === 'e-wallet';

        if (isWallet && userId) {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User account not found." });
            }

            const currentBalance = (user.walletBalance !== undefined && user.walletBalance !== null && !isNaN(user.walletBalance)) 
                ? Number(user.walletBalance) 
                : 5000.00;

            if (currentBalance < finalFare) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Insufficient E-Wallet balance. Required: ₹${finalFare}, Available: ₹${currentBalance}` 
                });
            }

            // Deduct and update user profile balance in MongoDB
            user.walletBalance = Math.round((currentBalance - finalFare) * 100) / 100;
            await user.save();

            // Create Debit transaction in 'wallets' collection
            const debitTx = new WalletTransaction({
                transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
                userId: userId.toString(),
                type: 'debit',
                amount: finalFare,
                description: `Ticket booking PNR: ${pnr}`
            });
            await debitTx.save();
        }

        const newBooking = new Booking({
            ...req.body,
            pnr,
            userId,
            trainNumber,
            trainName: trainName || req.body.trainName || "Express Train",
            originCode: originCode || req.body.originCode || "SRC",
            originName: originName || req.body.originName || "Origin Station",
            destinationCode: destinationCode || req.body.destinationCode || "DEST",
            destinationName: destinationName || req.body.destinationName || "Destination Station",
            departureTime: departureTime || req.body.departureTime || "06:00 AM",
            arrivalTime: arrivalTime || req.body.arrivalTime || "08:00 PM",
            travelDate,
            passengers: passengers && passengers.length > 0 ? passengers : [{ name: "Passenger", age: 25, gender: "Male", coach: "S1", berth: "12 (Middle)", status: "CNF" }],
            fareDetails: { totalFare: finalFare, ...(req.body.fareDetails || {}) },
            paymentMode: paymentMode || "E-Wallet",
            classType: classType || 'SL',
            bookingStatus: "Confirmed"
        });

        await newBooking.save();
        res.status(201).json({ success: true, booking: newBooking });
    } catch (error) {
        console.error("❌ POST /bookings Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET: /api/bookings/user/:userId
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// PATCH: /api/bookings/cancel/:pnr - Cancel & refund to wallet ledger
router.patch('/cancel/:pnr', async (req, res) => {
    try {
        const booking = await Booking.findOne({ pnr: req.params.pnr });
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        if (booking.bookingStatus === "Cancelled") return res.status(400).json({ success: false, message: "Already cancelled" });

        booking.bookingStatus = "Cancelled";
        if (booking.passengers) {
            booking.passengers.forEach(p => p.status = "CAN");
        }
        await booking.save();

        const refundAmount = booking.fareDetails?.totalFare || 500;

        // Refund credit into wallets collection
        const refundTx = new WalletTransaction({
            transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
            userId: booking.userId.toString(),
            type: 'credit',
            amount: refundAmount,
            description: `Refund processed for canceled ticket PNR: ${booking.pnr}`
        });
        await refundTx.save();

        const user = await User.findById(booking.userId);
        if (user) {
            const currentBal = (user.walletBalance !== undefined && user.walletBalance !== null && !isNaN(user.walletBalance)) 
                ? Number(user.walletBalance) 
                : 5000.00;
            user.walletBalance = Math.round((currentBal + refundAmount) * 100) / 100;
            await user.save();
        }

        res.status(200).json({ success: true, message: "Booking cancelled successfully", booking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

router.get('/:pnr', async (req, res) => {
    try {
        const booking = await Booking.findOne({ pnr: req.params.pnr });
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
        res.status(200).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
