var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const User = require("../models/user");

router.get('/', function(req, res, next) {
  const authToken = req.cookies['auth-token'];
  if (authToken) {
    authController.verifyLoginUser(req, res, function() {
      User.findOne({ email: req.userEmail })
        .then(function(user) {
          res.render('index', { user: user, isLoggedIn: true });
        })
        .catch(function(err) {
          next(err);
        });
    });
  } else {
    res.render('index', { isLoggedIn: false });
  }
});

module.exports = router;
