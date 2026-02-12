const mongoose = require('mongoose');

const aircraftSchema = mongoose.Schema({
    last_modified: Date,
    model: String,
    manufacturer: String,
    aircraft_type: String,
    capacity: Number,
    range_km: Number
})

const Aircraft = mongoose.model('dim_aircraft', aircraftSchema, 'dim_aircraft');

module.exports = Aircraft
