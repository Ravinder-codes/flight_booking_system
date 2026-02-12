const mongoose = require('mongoose');

const connect_db = async () => {
    const url = process.env.DB_CONNECTION_STRING;
    if (!url) {
        return Promise.reject(new Error('No connection string provided'))
    }
    return mongoose.connect(url);
}

module.exports = {
    connect_db, 
    mongoose
}
