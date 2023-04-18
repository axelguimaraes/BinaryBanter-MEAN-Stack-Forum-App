const mongoose = require('mongoose');
const Event = require('./eventSchema');


const realEstateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    events: {
        type: [Event],
        required: false
    }
});

const RealEstate = mongoose.model('RealEstate', realEstateSchema);
module.exports = RealEstate;