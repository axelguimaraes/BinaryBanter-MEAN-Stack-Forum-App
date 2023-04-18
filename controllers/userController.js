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

// Show 1 item by id
userController.show = function(req, res) {
    User.findOne({_id:req.params.id}).exec((err, dbuser)=>{
        if (err) {
            console.log('Error while reading!');
            res.redirect('/error');
        } else {
            res.render('users/userViewDetails', {user: dbuser})
        }
    })
}

// form to create 1 user
userController.formCreate = function(req, res) {
    res.render('user/createForm');
}

// creates 1 user as response to a form POST
userController.create = function(req,res) {
    var user = new User(req.body);
    user.save((err)=>{
        if (err){
            console.log('Error while saving');
            res.redirect('/error');
        } else {
            res.redirect('/users');
        }
    })
}

// shows 1 user to edit
userController.formEdit = function(req, res) {
    User.findOne({_id:req.params.id}).exec((err, dbuser)=>{
        if (err) {
            console.log('Error reading!');
            res.redirect('/error');
        } else {
            res.render('users/userEditDetails', {user: userdb});
        }
    })
}

// edits 1 user as response to a POST edit form
userController.edit = function(req, res) {
    User.findByIdAndUpdate(req.body._id, req.body, (err, editedUser)=>{
        if (err) {
            console.log('Error while saving');
            res.redirect('/error')
        } else {
            res.redirect('/items/show/'+req.body._id);
        }
    })
}

// deletes 1 user
userController.delete = function(req, res) {
    User.remove({_id:req.params.id}).exec((err)=>{
        if (err) {
            console.log('Error reading')
        } else {
            res.redirect('/users')
        }
    })
}

module.exports = userController;