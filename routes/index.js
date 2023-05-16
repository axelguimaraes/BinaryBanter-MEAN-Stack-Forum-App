var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')

router.get('/', authController.verifyLoginUser, function(req, res, next) {
    res.render('index', );
})

module.exports = router;