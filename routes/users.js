var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', userController.showAll);
router.get('/all', userController.getAllUsers);

router.get('/show/:id', userController.show);
router.get('/create', userController.formCreate);
router.post('/create', userController.create);
router.get('/edit/:id', userController.formEdit);
router.post('/edit/:id', userController.edit);
router.get('/delete/:_id', userController.delete);
router.post('/directCreate', userController.directCreate);
router.put('/directUpdate/:id', userController.directUpdate);

module.exports = router;