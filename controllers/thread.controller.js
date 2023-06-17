const ThreadModel = require("../models/thread.model");

let threadsController = {};

// Get all threads
threadsController.getAllThreads = (req, res) => {
  ThreadModel.find()
    .then((threads) => {
      res.status(200).json(threads);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Create a new thread
threadsController.createThread = (req, res) => {
  const { name, description, author } = req.body;

  const thread = new ThreadModel({
    name,
    description,
    createdBy: req.userId,
    author,
  });

  thread
    .save()
    .then((createdThread) => {
      res.status(201).json(createdThread);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: "Internal server error" });
    });
};

// Get a specific thread by ID
threadsController.getThreadById = (req, res) => {
  const { threadId } = req.params;

  ThreadModel.findById(threadId)
    .then((thread) => {
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.status(200).json(thread);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Update a specific thread by ID
threadsController.updateThreadById = (req, res) => {
  const { threadId } = req.params;
  const { name, description } = req.body;

  ThreadModel.findByIdAndUpdate(threadId, { name, description }, { new: true })

    .then((updatedThread) => {
      if (!updatedThread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.status(200).json(updatedThread);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Add a post to a specific thread by ID
threadsController.addPostToThread = (req, res) => {
  const { threadId } = req.params;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ error: "postId is missing" });
  }

  ThreadModel.findByIdAndUpdate(
    threadId,
    { $push: { posts: postId } },
    { new: true }
  )
    .then((updatedThread) => {
      if (!updatedThread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.status(200).json(updatedThread);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};




// Delete a specific thread by ID
threadsController.deleteThreadById = (req, res) => {
  const { threadId } = req.params;
  ThreadModel.findByIdAndDelete(threadId)
    .then((deletedThread) => {
      if (!deletedThread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.status(200).json({ message: "Thread deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = threadsController