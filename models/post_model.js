const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postsSchema = new Schema({
  username: String,
  description: {
    type: String,
    required: true,
  },
  phone_number: String,
});

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;