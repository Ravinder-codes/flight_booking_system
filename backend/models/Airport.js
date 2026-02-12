const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema(
    {
        last_modified: Date,
        name: String,
        city: String,
        state: String,
        country: String
    }
)

const Airport = mongoose.model('dim_airport', airportSchema, 'dim_airport');

module.exports = Airport;
