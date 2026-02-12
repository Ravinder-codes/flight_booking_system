const env = require('dotenv').config();
require('dotenv-expand').expand(env);
const express = require('express');

const flight_router = require('./router/flight');

const db_driver = require('./Utils/db_driver');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/flight', flight_router)


// connect to database
db_driver.connect_db()
.then(() => {
    console.log('Connected to database, Starting server ...')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
.catch((err) => {
    console.error(`Error in connecting to database: ${err.message}`)
})
