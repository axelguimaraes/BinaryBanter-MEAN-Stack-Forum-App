const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    //required: true,
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedAt: { type: Date, default: Date.now },
  upvotes: {type: Number, required: true, default: 0},
  downvotes: {type: Number, required: true, default: 0}
});

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;
