const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
    {
        last_modified: Date,
        date: Date,
        departure_airport_id: String,
        arrival_airport_id: String,
        aircraft_id: String,
        duration: Number,
        status: String,
        price: Number
    }
)

const Flight = mongoose.model('dim_flight', flightSchema, 'dim_flight');

module.exports = Flight;
