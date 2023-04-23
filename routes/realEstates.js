var express = require('express');
var router = express.Router();
var realEstateController = require('../controllers/realEstateController');

router.post("/create", realEstateController.create);
router.get("/list", realEstateController.getAllRealEstates);
router.put("/list/:id", realEstateController.update);
router.delete("/list/:id", realEstateController.delete);

module.exports = router;