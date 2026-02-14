const express = require('express');

const flightController = require('../controller/flight')  

const router = express.Router();


router.get('/trending_flight', flightController.trending_fight)
router.get('/search', flightController.searchFlights);

module.exports = router;
