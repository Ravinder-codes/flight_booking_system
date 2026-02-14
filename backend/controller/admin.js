const Flight = require('../models/Flight');

module.exports.addFlight = async (req, res) => {
    Flight.addFlight(req.body)
    .then(() => {
        return res.status(200).json(
            {
                message: "Successful"
            }
        )
    })
    .catch((err) => {
        return res.status(500).json(
            {
                message: `Unsuccessful ${err}`
            }
        )
    });
}
