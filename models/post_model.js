const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  phoneNumber: 
  {
    type: String,
    required:true
  }
});

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;
