const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresIn: { type: Number, required: true },
});

const AuthModel = mongoose.model("Auth", authSchema);
module.exports = AuthModel;
