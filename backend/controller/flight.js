const Flight = require('../models/Flight');
const utils = require('../Utils/commonUtils')
const { Types: { ObjectId } } = require('mongoose')


module.exports.searchFlights = async (req, res) => {
    /*
        DOC STRING
    */
    const {
        from, 
        to,
        sortBy, 
        sortOrder
    } = req.query || {};    

    const sortCondition = sortBy && { [sortBy] : sortOrder === 'desc'? -1 : 1 }
    
    try {
        const flights = await Flight.aggregate([
            {
                $lookup: {
                    from: "dim_airport",
                    localField: "arrival_airport_id",
                    foreignField: "_id",
                    as: "arrivalAirport"
                }
            },
            {
                $unwind: "$arrivalAirport"
            },
            {
                $lookup: {
                    from: "dim_airport",
                    localField: "departure_airport_id",
                    foreignField: "_id",
                    as: "departureAirport"
                }
            },
            {
                $unwind: "$departureAirport"
            },  
            {
                $match: {
                    ... (to && {"arrivalAirport.city": to}),
                    ... (from && {"departureAirport.city": from})
                }
            },
        ])

        return res.status(200).json(
            {
                flights: flights,
            }
        );
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({
                message: `Error occured while processing the request`
            });
    }
}

module.exports.relevantFlights = async (req, res) => {
    /*
        DOC STRING
    */

    // TODO: Validate the fligthId

    const flightId = new ObjectId(req.query.flightId);
    const {
        arrival_airport_id : { city : arrivalCity },
        departure_airport_id : { city : departureCity },
        arrival_airport_id : { country : arrivalCountry},
        departure_airport_id : { country : departureCountry},
        price : flightPrice
    } = await utils.getFlightDetails(flightId);

    console.log(flightPrice)
    const relevantFlights = await Flight.aggregate([
        {
            $lookup: {
                from : "dim_airport",
                localField : "arrival_airport_id",
                foreignField : "_id",
                as : "arrivalAirport"
            }
        },
        {
            $unwind : "$arrivalAirport"
        },
        {
            $lookup : {
                from : "dim_airport",
                localField : "departure_airport_id",
                foreignField: "_id",
                as : "departureAirport"
            }
        }, 
        {
            $unwind : "$departureAirport"
        },
        {
            $match : {
                _id : { $ne : flightId }
            }
        },
        {
            $set : {
                rating : {
                    $add : [
                        // Rate the relevant flights based on their matching with the searched flight
                        { $cond : [{ $eq: [ "$arrivalAirport.city", arrivalCity]}, 4, 0]},
                        { $cond : [{ $eq: [ "$departureAirport.city", departureCity]}, 8, 0]},
                        { $cond : [{ $eq: [ "$arrivalAirport.country", arrivalCountry ]}, 1, 0]},
                        { $cond : [{ $eq: [ "$departureAirport.country", departureCountry ]}, 2, 0]}
                    ]
                },
                priceDiff : {
                    $abs : { $subtract : [ "$price", flightPrice ] }
                } 
            }
        },
        {
            $sort : { rating : -1, priceDiff : 1 }
        },
        {
            $limit: 5
        }
    ])
    console.log(relevantFlights);
}

module.exports.getFlightDetails = async (req, res) => {
    /*
        DOC STRING
    */
    try {
        const flightObj = await Flight.findById(req.body._id);
        return res
            .status(200)
            .json({
                flightDetails : flightObj
            })
    } catch (err){
        console.log(err);
        return res
            .status(500)
            .json({
                message: `Error occured while processing the request`
            });
    }    
}
