const express = require('express');

const signUpController = require('../controller/signup');

const router = express.Router();


router.post('/', signUpController.signUpUser);
module.exports = router;
