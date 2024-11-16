const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postsSchema = new Schema({
  username: String,
  description: String,
  phone_number: String,
});

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;