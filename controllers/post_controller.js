const Posts = require("../models/post_model");
const { ObjectId } = require("mongoose");

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

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  addComment,
};
