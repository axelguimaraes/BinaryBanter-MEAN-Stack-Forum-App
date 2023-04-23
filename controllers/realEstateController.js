var mongoose = require("mongoose");
var RealEstate = require("../models/realEstateSchema");

var realEstateSchema = {};

realEstateSchema.create = function (req, res, next) {
    const realEstate = new RealEstate ({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      events: req.body.events
    });
    realEstate.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json(realEstate);
      }
    });
  };

  realEstateSchema.update = function (req, res, next) {
    RealEstate.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, realEstate) {
      if (err) {
        next(err);
      } else {
        res.json(realEstate);
      }
    });
  };

  realEstateSchema.getAllRealEstates = function (req, res, next) {
    RealEstate.find(function (err, realEstates) {
      if (err) {
        next(err);
      } else {
        res.json(realEstates);
      }
    })
  }

  realEstateSchema.delete = function (req, res, next) { //Broken but works
    RealEstate.findByIdAndDelete(req.params.id, function(err, realEstate) {
      if (err) {
        next(err);
      } else {
        res.json(realEstate)
      }
    })
  };
  
  module.exports = realEstateSchema;