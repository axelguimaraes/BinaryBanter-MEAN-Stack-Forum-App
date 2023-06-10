const express = require('express');
const usersController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Get user profile
router.get('/:id', authController.isAuthenticated, usersController.getProfile);

// Update user profile
router.put('/:id', authController.isAuthenticated, usersController.updateProfile);

// Delete user account
router.delete('/:id', authController.isAuthenticated, usersController.deleteAccount);

module.exports = router;
