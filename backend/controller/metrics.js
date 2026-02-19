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
        const activeUsersCount = await User.countDocuments({ is_active : true });
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

module.exports.trendingFlights = async (req, res) => {
    /*

    */
    try{
        const top5Flights = await Flight.aggregate([   
            {
                $match: {status: "pending"}
            },
            {
                $lookup: {
                    from: "dim_aircraft",
                    localField: "aircraft",
                    foreignField: "_id",
                    as: "flight_details"
                }
            },
            {
                $addFields: {
                    ratio: { $divide: ["$seatBooked", "$capacity"]}
                }
            },
            {
                $project: {
                    _id: 1,
                    ratio: 1
                }
            },
            {
                $sort: {ratio: -1}
            },
            {
                $limit: 5
            }
        ]);
        
        return res
            .status(200)
            .json({
                trendingFlights: top5Flights
            });
    }
    catch (err) {
        console.log(`Error occured ${err}`);
        return res
            .status(500)    
            .json({
                message: `Error occured`
            });
    }
}

module.exports.flightCancelRate = async (req, res) => {
    try {
        const cancelRate = await Flight.aggregate([
            {
                $match: { status : {$in: ["completed", "cancelled"]}},
            },
            {
                $group: {
                    _id: null,
                    totalRelevant: {$sum: 1},
                    cancelledFlights: {$sum: {$cond: [{$eq: ["$status", "cancelled"]}, 1, 0]}}
                }
            },
            {
                $project: {
                    totalRelevant: 1,
                    cancelledFlights: 1,
                    cancelRatio: { $multiply: [{ $divide: ["$cancelledFlights", "totalRelevant"] }, 100]}
                }   
            }
        ]);

        return res.status(200).json({
                message: cancelRate[0]
            });
    } catch (err) {
        console.log(`Error occured ${err}`);
        return res
            .status(200)
            .json({
                message: `Cannot process due to error`
            });
    }
}
