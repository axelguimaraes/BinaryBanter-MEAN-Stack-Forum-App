const express = require('express');
const postController = require('../controllers/post.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Get all posts
router.get('/', postController.getAllPosts);

// Create a new post
router.post('/', authController.isAuthenticated, postController.createPost);

// Update a specific post by ID
router.put('/:id', authController.isAuthenticated, postController.updatePost);

// Delete a specific post by ID
router.delete('/:id', authController.isAuthenticated, postController.deletePost);

module.exports = router;
