var mongoose = require('mongoose');
var User = require('../models/userSchema');

var userController = {};

// Show all users
userController.showAll = function(req, res) {
    User.find({}).exec((err, dbusers)=>{
        if (err) {
            console.log("Error while reading!");
            res.redirect('/error')
        } else {
            console.log(dbusers);
            res.render('users/usersList', {users: dbusers});
        }
    })
}