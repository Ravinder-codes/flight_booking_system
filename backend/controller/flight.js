const express = require('express');

const Flight = require('../models/Flight');

module.exports.trending_fight = async (req, res) => {
    console.log('Trending flights');
    const flights = await Flight.find();
    console.log(flights);

    return res.status(200).json({
        message: "Here you will get all the flights",
        data: flights
    })
}   
