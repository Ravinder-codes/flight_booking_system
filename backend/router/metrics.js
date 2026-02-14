const express = require('express');

const metricsController = require('../controller/metrics')


const router = express.Router();

router.get('/', metricsController.everydayUpdates);
router.get('/active-users-count', metricsController.activeUsersCount);
router.get('/completed-flights-count', metricsController.totalCompletedFlightsCount);
router.get('/total-aircrafts', metricsController.totalAircraftCount);
router.get('/total-airports', metricsController.totalAirportCount);

module.exports = router;
