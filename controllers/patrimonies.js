const mongoose = require("mongoose")
const mongoPatrimony = require("../models/patrimonies")

let patrimoniesController = {}

patrimoniesController.showAll = function(req, res, next) {
    mongoPatrimony.find({})
        .then(function(patrimonyList){
            const inputs = {
                patrimonies: patrimonyList
            }
            res.render("patrimonies/showPatrimonies", inputs)
        })
        .catch(function(err){
            next(err)
        })
}

patrimoniesController.showDetails = function(req, res, next){
    mongoPatrimony.findOne({name:req.params.name})
        .then(function(patrimonyDB){
            const inputs = {
                patrimony:patrimonyDB
            }
            res.render("patrimonies/showPatrimony", inputs)
        })
        .catch(function(err){
            next(err)
        })
}

patrimoniesController.createPatrimony = function(req, res, next){
    mongoPatrimony.create(req.body)
        .then(function(){
            res.redirect("/patrimonies/showPatrimonies")
        })
        .catch(function(err){
            next(err)
        })
}

patrimoniesController.deletePatrimony = function(req, res, next){
    mongoPatrimony.findOneAndDelete({name:req.params.name})
        .then(function(deletedPatrimony){
            res.redirect("/patrimonies/showPatrimonies")
        })
        .catch(function(err){
            next(err)
        })
}

module.exports = patrimoniesController;