var express = require('express')
var router = express.Router()
const usersController = require("../controllers/users")
const authController = require("../controllers/auth")

router.get("/showUsers", authController.verifyLoginUser, function(req, res, next){
    usersController.showAll(req, res, next)
})

module.exports = router;