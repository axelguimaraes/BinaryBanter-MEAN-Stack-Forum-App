const PostModel = require("../models/post.model");
const jwt = require('jsonwebtoken');
const config = require("../jwt/config");

const postController = {};

// Get all posts
postController.getAllPosts = (req, res) => {
  console.log('Retrieving posts');
  PostModel.find()
    .populate("thread", "name")
    .then((posts) => {
      if (!posts || posts.length === 0) {
        return res.status(404).json({ error: "No posts found" });
      }
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Create a new post
postController.createPost = (req, res) => {
  const { title, content, thread, author, image, tags } = req.body;

  const post = new PostModel({
    title,
    content,
    thread,
    createdBy: req.userId,
    author,
    image: image || null,
    tags: tags || null
  });

  console.log(post)
  post
    .save()
    .then((createdPost) => {
      res.status(201).json(createdPost);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Get a specific post by ID
postController.getPostById = (req, res) => {
  const postId = req.params.postId;

  PostModel.findById(postId)
    .populate("thread", "name")
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Update a specific post by ID
postController.updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content, thread, image } = req.body;

  PostModel.findByIdAndUpdate(
    postId,
    { title, content, thread, image },
    { new: true }
  )
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(updatedPost);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Delete a specific post by ID
postController.deletePost = (req, res) => {
  const postId = req.params.id;

  PostModel.findByIdAndDelete(postId)
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Upvote a post
postController.upvotePost = (req, res) => {
  const postId = req.params.id;

  PostModel.findByIdAndUpdate(
    postId,
    { $inc: { upvotes: 1 } },
    { new: true }
  )
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(updatedPost);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Downvote a post
postController.downvotePost = (req, res) => {
  const postId = req.params.id;

  PostModel.findByIdAndUpdate(
    postId,
    { $inc: { downvotes: 1 } },
    { new: true }
  )
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(updatedPost);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Search posts by tags
postController.searchPostsByTags = (req, res) => {
  const tags = req.query.tags; // Get the tags directly from the query

  PostModel.find({ tags: { $regex: tags, $options: "i" } })
    .populate("thread", "name")
    .then((posts) => {
      if (!posts || posts.length === 0) {
        return res.status(404).json({ error: "No posts found" });
      }
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};



module.exports = postController;
