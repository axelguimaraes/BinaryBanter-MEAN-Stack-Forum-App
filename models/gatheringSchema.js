const mongoose = require('mongoose');
const RealEstate = require('./realEstateSchema');

const gatheringSchema = new mongoose.Schema({
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

const Gathering = mongoose.model('Gathering', gatheringSchema);
module.exports = Gathering;