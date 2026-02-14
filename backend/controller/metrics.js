const Aircraft = require('../models/Aircraft');
const Airport = require('../models/Airport');
const Flight = require('../models/Flight');
const User = require('../models/User');

module.exports.everydayUpdates = (req, res) => {
    /*
        DOC STRING
    */
    return res.status(200).json(
        {
            message: "home page details"
        }
    );
};

module.exports.activeUsersCount = async (req, res) => {
    /*
        DOC STRING
    */
    try{
        const activeUsersCount = await User.countDocuments({ isActive : true });
        res.status(200).json({
            activeUsersCount : activeUsersCount
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message : `Error: Cannot fetch total active users count`
        });
    };

}

module.exports.totalCompletedFlightsCount = async (req, res) => {
    /*
        DOC STRING
    */

    try {
        const totalFlightsCount = await Flight.countDocuments({ status : 'Completed' });
        res.status(200).json({
            totalFlightsCount : totalFlightsCount
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error: Cannot fetch the completed flights count`
        });
    }
}

module.exports.totalAirportCount = async (req, res) => {
    /*
        DOC STRING
    */

    try {
        const airportCount = await Airport.countDocuments();
        res.status(200).json({
            totalAirports : airportCount
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error: Cannot fetch Airport count`
        });
    }    
}

module.exports.totalAircraftCount = async (req, res) => {
    /*
        DOC STRING
    */

    try {
        const aircraftCount = await Aircraft.countDocuments();
        res.status(200).json({
            totalAircraftCount : aircraftCount
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error: Cannot fetch Aircraft count`
        });
    }
}
