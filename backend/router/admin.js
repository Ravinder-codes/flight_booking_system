const express = require('express');
const admin_controller = require('../controller/admin')

const router = express.Router();

router.post('/add_flight', admin_controller.addFlight);

module.exports = router;
