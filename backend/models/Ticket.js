const mongoose = require('mongoose');


const ticketSchema = mongoose.Schema({
    last_modified: Date,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dim_user'
    },
    ticket_count: Number,
    flight_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dim_flight'
    },
    net_price: Number,
})


const Ticket = new mongoose.model('dim_ticket', ticketSchema, 'dim_ticket');

module.exports = Ticket;
