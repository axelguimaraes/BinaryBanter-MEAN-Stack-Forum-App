const ThreadModel = require("../models/thread.model");
const PostModel = require("../models/post.model")

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

// Delete a post from a specific thread by ID
threadsController.deletePostFromThread = (req, res) => {
  const { threadId } = req.params;
  const { postId } = req.body;
  console.log("Deleting", postId + ", in thread:", threadId);
  
  // Find and delete the specified post within this thread's array of posts
  ThreadModel.findByIdAndUpdate(
    threadId,
    { $pull: { posts: postId } },
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

  // Retrieve the posts associated with the thread
  ThreadModel.findById(threadId)
    .populate('posts')
    .exec((err, thread) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }

      // Delete the associated posts
      PostModel.deleteMany({ _id: { $in: thread.posts } })
        .then(() => {
          // Delete the thread
          ThreadModel.findByIdAndDelete(threadId)
            .then(() => {
              res.status(200).json({ message: "Thread deleted successfully" });
            })
            .catch((error) => {
              res.status(500).json({ error: "Internal server error" });
            });
        })
        .catch((error) => {
          res.status(500).json({ error: "Internal server error" });
        });
    });
};


module.exports = threadsController