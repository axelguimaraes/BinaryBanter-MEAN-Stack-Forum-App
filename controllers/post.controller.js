const PostModel = require("../models/post.model");

postController = {};

// Get all posts
postController.getAllPosts = (req, res) => {
  console.log('Retriving posts')
  PostModel.find()
    .populate("thread", "name")
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({ error: "Internal server error" });
    });
};

// Create a new post
postController.createPost = (req, res) => {
  const { title, content, thread } = req.body;
  const userId = req.userId;

  const post = new PostModel({
    title,
    content,
    thread,
    user: userId,
  });

  post
    .save()
    .then((createdPost) => {
      res.status(201).json(createdPost);
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({ error: "Internal server error" });
    });
};

// Update a specific post by ID
postController.updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content, thread } = req.body;

  PostModel.findByIdAndUpdate(postId, { title, content, thread }, { new: true })
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(updatedPost);
    })
    .catch((error) => {
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
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = postController