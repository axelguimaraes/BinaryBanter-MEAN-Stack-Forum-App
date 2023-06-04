const express = require('express');
const threadsController = require('../controllers/threads.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Get all threads
router.get('/', threadsController.getAllThreads);

// Create a new thread
router.post('/', authController.isAuthenticated, threadsController.createThread);

// Get a specific thread by ID
router.get('/:threadId', threadsController.getThreadById);

// Update a specific thread by ID
router.put('/:threadId', authController.isAuthenticated, threadsController.updateThreadById);

// Delete a specific thread by ID
router.delete('/:threadId', authController.isAuthenticated, threadsController.deleteThreadById);

module.exports = router;
