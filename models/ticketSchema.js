const mongoose = require('mongoose');
const User = require('./userSchema');
const RealEstate = require('./realEstateSchema');
const Event = require('./eventSchema');

const ticketSchema = new mongoose.Schema({
    user: {
        type: User,
        required: true
    },

    realEstate: {
        type: RealEstate,
        required: true
    },

    event: {
        type: Event,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;