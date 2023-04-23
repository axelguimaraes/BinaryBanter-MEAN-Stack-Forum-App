var mongoose = require("mongoose");
var User = require("../models/userSchema");

var userController = {};

// mostra todos os users
userController.showAll = function (req, res) {
  User.find({}).exec((err, dbusers) => {
    if (err) {
      console.log("Erro a ler")
      res.redirect("/error")
    } else {
      console.log(dbusers);
      res.render("users/userList", { users: dbusers });
    }
  })
}

// mostra 1 user por id
userController.show = function (req, res) {
  User.findOne({ _id: req.params.id }).exec((err, dbuser) => {
    if (err) {
      console.log("Erro a ler")
      res.redirect("/error")
    } else {
      res.render("users/userViewDetails", { user: dbuser });
    }
  })
}

// form para criar 1 user
userController.formCreate = function (req, res) {
  res.render('users/createForm')
}

// cria 1 user como resposta a um post de um form
userController.create = function (req, res) {
  var user = new User(req.body);
  user.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/users")
    }
  })
}

// mostra 1 user para edicao
userController.formEdit = function (req, res) {
  User.findOne({ _id: req.params.id }).exec((err, dbuser) => {
    if (err) {
      console.log("Erro a ler")
      res.redirect("/error")
    } else {
      res.render("users/userEditDetails", { user: dbuser });
    }
  })
}

// edita 1 user como resposta a um post de um form editor
userController.edit = function (req, res) {
  User.findByIdAndUpdate(req.body._id, req.body, (err, editedUser => {
    if (err) {
      console.log("Erro ao gravar")
      res.redirect("/error")
    } else {
      res.redirect("/users/show" + req.body._id);
    }
  }))
}

// elimina 1 user
userController.delete = function (req, res) {
  User.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
    } else {
      res.redirect("/users")
    }
  })
}

module.exports = userController;