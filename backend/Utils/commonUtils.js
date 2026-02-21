const Flight = require('../models/Flight')


module.exports.getFlightDetails = ( async ( flightId ) => {
    let flightDetails = await Flight
        .find({_id: flightId})
        .populate('arrival_airport_id')
        .populate('departure_airport_id')
        .populate('aircraft_id');

    return flightDetails[0];
})
