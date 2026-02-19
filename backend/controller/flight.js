const Flight = require('../models/Flight');


const top5DomesticRelevantFlights = async(country) => {
    /*
        DOC STRING  
    */
}

const top5InternationalRelevantFlights = async (arrivalCountry, destinationCountry) => {
    /*
        DOC STRING
    */

}

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

    const filters = {
        ... (from && {departure: from}),
        ... ( to && {arrival: to})
    };
    
    const sortCondition = sortBy && { [sortBy] : sortOrder === 'desc'? -1 : 1 }
    
    try {
        const result = await Flight.find(filters).sort(sortCondition);

        return res.status(200).json(
            {
                message: result
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

    const {
        arrivalCountry,
        destinationCountry
    } = req.body;

    const response = undefined;

    try {
        if (arrivalCountry === destinationCountry) {
            response = await top5DomesticRelevantFlights(arrivalCountry);
        }
        else {
            response = await top5InternationalRelevantFlights(arrivalCountry, destinationCountry);
        }

        return res
            .status(200)
            .json({
                relevantFlights: response
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({
                message: `Error occured while processing request`
            });
    }

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
