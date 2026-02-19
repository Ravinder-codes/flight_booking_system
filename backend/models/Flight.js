const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    last_modified: Date,
    date: Date,
    departure_airport_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dim_airport'
    },
    arrival_airport_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'aim_airport'
    },
    aircraft_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dim_aircraft'
    },
    duration: Number,
    status: String,
    price: Number
})

const Flight = mongoose.model('dim_flight', flightSchema, 'dim_flight');

module.exports = Flight;
