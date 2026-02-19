const express = require('express');

const flightController = require('../controller/flight')  

const router = express.Router();


router.get('/search', flightController.searchFlights);
router.get('/relevant-flights', flightController.relevantFlights);
router.get('/details', flightController.getFlightDetails);

module.exports = router;
