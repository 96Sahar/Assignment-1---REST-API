const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    sender: 
    { 
        type: String, 
        required: true 
    },
    description: 
    { 
        type: String, 
        required: true 
    },
    PostId:
    {
        type: String,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
