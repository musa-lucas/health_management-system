const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
const PORT = 3000

const patients  = []

const bookings = []

// Registering a patient
app.post('/registration', (req, res) => {
    const { name, age, dob, email, password } = req.body

    if(!name || !age || !dob || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Some data might be missing.'
        })
    }

    let patientId = Math.round(Math.random()*100000000)

    patients.push({
        name, age, dob, email, password, patientId
    })

    return res.status(200).json({
        success: true,
        message: "patient is registered.",
        patientId
    })
})


// create a booking for patient
app.post('/booking', (req, res) => {
    const { time, date, patientId } = req.body

    // checking all values are defined or not
    if(!time || !date || !patientId) {
        return res.status(400).json({
            success: false,
            message: 'Some data might be missing.'
        })
    }

    // validating date and time if it is future date and time or not
    const current_date = new Date() //this is a date time object which will provide you with current timestamp
    const booking_date = new Date(`${date} ${time}`)

    if(booking_date <= current_date) {
        return res.status(400).json({
            success: false,
            message: "Booking date and time cannot be in past or equal"
        })
    }


    // If patientId is correct or not
    const patient = patients.find(patient => patientId == patient.patientId)

    if (!patient) {
        return res.status(400).json({
            success: false,
            message: "Provide a valid patient ID"
        })
    }

    let bookingId = Math.round(Math.random()*100000000)
    bookings.push({
        time, date, patientId, status: 'upcoming', bookingId
    })

    return res.status(200).json({
        success: 'true',
        message: 'booking created',
        bookingId
    })

})


// view booking
app.get('/booking/:bookingId', (req, res) => {
    const {bookingId} = req.params

    const booking = bookings.find(booking => bookingId == booking.bookingId)

    if(!booking) {
        return res.status(400).json({
            success: false,
            message: "Provide a valid booking ID"
        })
    }

    return res.status(200).json({
        success: true,
        data: booking
    })
})


// Make an API to get all booking which are upcoming



// make an API to fetch patient details using their patient ID




// Make an API to change booking status to ongoing/past/cancelled





app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connected...")
        console.log("Server running on http://localhost:3000")
    })
    .catch((err) => console.log(err))
    
})