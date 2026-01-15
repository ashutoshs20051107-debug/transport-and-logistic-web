const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    pickup: { type: String, required: true },
    delivery: { type: String, required: true },
    vehicle: { type: String, required: true },
    date: { type: Date, required: true },
    goods: String,
    status: { type: String, default: "In Transit" },
    createdAt: { type: Date, default: Date.now } // This allows sorting
});

module.exports = mongoose.model('Booking', bookingSchema);