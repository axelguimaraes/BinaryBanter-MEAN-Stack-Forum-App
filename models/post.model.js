const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    //required: true,
  },
  image: { type: String }, // New field for the image URL (non-required)
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedAt: { type: Date, default: Date.now },
});
