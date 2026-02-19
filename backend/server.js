const env = require('dotenv').config();
require('dotenv-expand').expand(env);
const express = require('express');
const cors = require('cors');

const flightRouter = require('./router/flight');
const adminRouter = require('./router/admin');
const signUpRouter = require('./router/signup');
const loginRouter = require('./router/login');
const metricsRouter = require('./router/metrics');

const dbDriver = require('./Utils/db_driver');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/flight', flightRouter);
app.use('/admin', adminRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/metrics', metricsRouter);

// connect to database
dbDriver.connect_db()
.then(() => {
    console.log('Connected to database, Starting server ...')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
.catch((err) => {
    console.error(`Error in connecting to database: ${err.message}`)
})
