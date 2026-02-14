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

Flight.searchFlights = async (req, res) => {
    const {
        arrival,
        destination, 
        sortBy, 
        sortOrder
    } = req.body;
        

    const filters = {
        ... (arrival && {arrival}),
        ... (destination && {destination})
    };
    

    const sortCondition = sortBy && { [sortBy] : sortOrder === 'desc'? -1 : 1 }
    return await Flight.find(filters).sort(sortCondition);
}

// Add flight
Flight.addFlight = async (flightData) => {
    // Sample data
    const flight = new Flight({
        last_modified: new Date(),
        date: new Date(),
        departure_airport_id: 1, 
        arrival_airport_id: 1,
        aircraft_id: 1,
        duration: 2,
        status: "Pending",
        price: 2000, 
    });
    return await flight.save()
};


module.exports = Flight;
