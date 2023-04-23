const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    age: {
        type: String,
        enum: ['CHILD', 'TEEN', 'ADULT', 'ELDER'],
        required: true
    },
    ticketsAcquired: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['STANDARD', 'AFFILIATED'],
        required: true,
        default: 'STANDARD'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;