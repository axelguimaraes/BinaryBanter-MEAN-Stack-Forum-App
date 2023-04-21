var mongoose = require("mongoose");
var User = require("../models/userSchema");

var userController = {};

// Show all users
userController.showAll = function (req, res) {
  User.find({})
    .then((dbusers) => {
      console.log(dbusers);
      res.render("users/usersList", { users: dbusers }); // ERRO
    })
    .catch((err) => {
      console.log("Error while reading");
      res.redirect("/error");
    });
};

userController.getAllUsers = function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      next(err);
    } else {
      res.json(users);
    }
  });
};

// Show 1 item by id
userController.show = function (req, res) {
  User.findOne({ _id: req.params.id })
    .then((dbuser) => {
      res.render("users/userViewDetails", { user: dbuser });
    })
    .catch((err) => {
      console.log("Error while reading!");
      res.redirect("/error");
    });
};

// form to create 1 user
userController.formCreate = function (req, res) {
  res.render("user/createForm");
};

// creates 1 user as response to a form POST
userController.create = function (req, res) {
  var user = new User(req.body);
  user.save((err) => {
    if (err) {
      console.log("Error while saving");
      res.redirect("/error");
    } else {
      res.redirect("/users");
    }
  });
};

// shows 1 user to edit
userController.formEdit = function (req, res) {
  User.findOne({ _id: req.params.id }).then((dbuser) => {
    res.render("users/userEditDetails", { user: userdb }).catch((err) => {
      console.log("Error reading!");
      res.redirect("/error");
    });
  });
};

// edits 1 user as response to a POST edit form
userController.edit = function (req, res) {
  User.findByIdAndUpdate(req.body._id, req.body, (err, editedUser) => {
    if (err) {
      console.log("Error while saving");
      res.redirect("/error");
    } else {
      res.redirect("/items/show/" + req.body._id);
    }
  });
};

// deletes 1 user
userController.delete = function (req, res) {
  User.remove({ _id: req.params.id })
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      console.log("Error reading");
    });
};

// creates 1 user directly
userController.directCreate = function(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    birthDate: req.user.birthDate,
    age: req.user.age,
    ticketsAcquired: req.user.ticketsAcquired,
    points: req.body.points,
    status: req.body.status
  });
  user.save(function(err) {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
}

// updates 1 user directly
userController.directUpdate = function(req, res, next) {
  User.findByIdAndUpdate(
    req.params._id,
    req.body,
    {new: true},
    function (err, user) {
      if (err) {
        next(err)
      } else {
        res.json(user)
      }
    }
  )
}

module.exports = userController;
