const mongoose = require('mongoose');
const RealEstate = require('./realEstateSchema');

const eventSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    realEstate: {
        type: RealEstate,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;