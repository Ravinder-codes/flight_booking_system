const express = require('express');

const flight_controller = require('../controller/flight')  

const router = express.Router();


router.get('/trending_flight', flight_controller.trending_fight)

module.exports = router;
