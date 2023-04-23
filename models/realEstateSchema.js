const mongoose = require('mongoose');
const Gathering = require('./gatheringSchema');

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
        type: [Gathering.Schema],
        required: false
    }
});

const RealEstate = mongoose.model('RealEstate', realEstateSchema);
module.exports = RealEstate;