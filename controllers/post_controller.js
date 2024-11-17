const Posts = require("../models/post_model");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  const filter = req.query;
  console.log(filter);
  try {
    if (filter.username) {
      const posts = await Posts.find({ username: filter.username });
      return res.send(posts);
    } else {
      const posts = await Posts.find();
      return res.send(posts);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const createPost = async (req, res) => {
  console.log(req.body);
  try {
    const post = await Posts.create(req.body);
    if (post) {
      return res.send(post);
    } else {
      return res.status(404).send("Post not created");
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const post = await Posts.findById(id);
      return res.status(200).send(post);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    console.log("Get Post By Id Error");
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const post = req.body;
      const update = await Posts.findByIdAndUpdate(id, post, { new: true });
      return res.status(200).send(update);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    console.log("Update Post Error");
  }
};

const deletePost = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const post = await Posts.findByIdAndDelete(id);
            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
};

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { username, description } = req.body;
  console.log(username);
  console.log(description);
  if (!username || !description) {
    return res.status(400).json({ error: "Post not found" });
  }
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.comments.push({ username, description });
    await post.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getAllCommentsInAPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Posts.findById(postId, "comments");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post.comments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getCommentById = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const { username, description } = req.body;
    
    try {
        const post = await Posts.findById(postId);
        if (!post) {
        return res.status(404).json({ error: "Post not found" });
        }
    
        const comment = post.comments.id(commentId);
        if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
        }
    
        comment.username = username;
        comment.description = description;
    
        await post.save();
        return res.status(200).json(comment);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({ error: "Invalid postId or commentId" });
    }
    
    try {
        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const result = await Posts.updateOne(
            { _id: postId },
            { $pull: { comments: { _id: commentId } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Comment not found" });
        }

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  addComment,
  getAllCommentsInAPost,
  getCommentById,
  updateComment,
  deleteComment,
};
