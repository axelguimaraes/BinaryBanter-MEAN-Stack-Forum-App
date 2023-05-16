const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },

    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('users', User)