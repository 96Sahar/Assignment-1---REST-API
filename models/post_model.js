const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  sender: { type: String, required: true },
  description: { type: String, required: true },
});

const postsSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone_number: String,
  comments: [commentSchema],
});

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;
