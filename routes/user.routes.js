const express = require('express');
const usersController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Get user profile
router.get('/profile', authController.isAuthenticated, usersController.getProfile);

// Update user profile
router.put('/profile', authController.isAuthenticated, usersController.updateProfile);

// Delete user account
router.delete('/account', authController.isAuthenticated, usersController.deleteAccount);

module.exports = router;
