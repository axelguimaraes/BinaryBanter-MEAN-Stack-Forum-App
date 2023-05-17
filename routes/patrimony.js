var express = require("express")
var router = express.Router()
const patrimoniesController = require("../controllers/patrimonies")
const authController = require("../controllers/auth")

router.get("/showPatrimony/:name", authController.verifyLoginUser, function(req,res, next){
    patrimoniesController.showDetails(req, res, next)
})

router.get("/submitPatrimony", authController.verifyLoginUser, function(req, res, next){
    res.render("patrimonies/submitPatrimony")
})

router.post("/submittedPatrimony", authController.verifyLoginUser, function(req,res, next){
    patrimoniesController.createPatrimony(req, res, next)
}) 

router.get("/showPatrimonies", authController.verifyLoginUser, function(req, res, next){
    patrimoniesController.showAll(req, res, next)
})

router.get("/deletePatrimony/:name", authController.verifyLoginUser, function(req, res){
    patrimoniesController.deletePatrimony(req, res)
})

module.exports = router;