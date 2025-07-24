const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'upcoming',
        enum: ['upcoming', 'booked']
    },
    patientId: {
        type: mongoose.Types.ObjectId,
        ref: 'patients',
        required: true
    }
})

module.exports = mongoose.model('bookings', bookingSchema)