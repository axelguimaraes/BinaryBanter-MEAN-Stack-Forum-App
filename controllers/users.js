const mongoose = require("mongoose")
const mongoUser = require("../models/user")

let usersController = {}

usersController.showAll = function(req, res, next) {
    mongoUser.find({})
        .then(function(userList){
            const inputs = {
                users: userList
            }
            res.render('users/showUsers', inputs)
        })
        .catch(function(err){
            next(err)
        })
}

module.exports = usersController;