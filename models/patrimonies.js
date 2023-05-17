const mongoose = require("mongoose")

const Patrimony = new mongoose.Schema({
    name:String,
    description:String,
    address:String
})

module.exports = mongoose.model("patrimonies", Patrimony)