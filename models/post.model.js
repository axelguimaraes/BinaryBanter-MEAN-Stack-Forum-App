const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { 
    type: String,
    //required: true
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    //required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
